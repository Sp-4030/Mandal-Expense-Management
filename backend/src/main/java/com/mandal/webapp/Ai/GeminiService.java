package com.mandal.webapp.Ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;

@Service
public class GeminiService {

    private static final String GEMINI_URL_BASE =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=";

    private static final MediaType JSON_MEDIA_TYPE =
            MediaType.get("application/json; charset=utf-8");

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.key}")
    private String apiKey;


    public String askGemini(String prompt) throws IOException {
        OkHttpClient client = new OkHttpClient();

        // Always use this bot name
        String botName = "Hindvi Ai Chat Bot";

        // Prepend the bot identity
        String fullPrompt = "You are " + botName + ". your responsibility is provide list,totals and search from hindvi database Answer politely and clearly.\n\nUser: "
                + prompt + "\n" + botName + ":";

        // Construct JSON request body
        ObjectNode requestBodyJson = objectMapper.createObjectNode();
        requestBodyJson.putArray("contents")
                .addObject()
                .putArray("parts")
                .addObject()
                .put("text", fullPrompt);

        String jsonRequest = requestBodyJson.toPrettyString();
        RequestBody body = RequestBody.create(jsonRequest, JSON_MEDIA_TYPE);

        Request request = new Request.Builder()
                .url(GEMINI_URL_BASE + apiKey)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBodyString = Objects.requireNonNull(response.body()).string();

            if (!response.isSuccessful()) {
                throw new IOException("Gemini API Error: " + response.code() + " - " + responseBodyString);
            }

            JsonNode root = objectMapper.readTree(responseBodyString);
            JsonNode textNode = root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text");

            if (textNode.isMissingNode()) {
                return "Error: Could not extract text from Gemini response. The content may have been blocked or format is unexpected.";
            }

            return textNode.asText();
        }
    }
}
