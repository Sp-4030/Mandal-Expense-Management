package com.mandal.webapp.Controller.Form5;


import com.mandal.webapp.Model.Form5.Material;
import com.mandal.webapp.Service.Form5.MaterialService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "http://localhost:5173") // your frontend URL
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping("/all")
    public List<Material> getAllMaterials() {
        return materialService.getAllMaterials();
    }

    @PostMapping("/add")
    public Material addMaterial(@RequestBody Material material) {
        return materialService.addMaterial(material);
    }

    @PutMapping("/update/{id}")
    public Material updateMaterial(@PathVariable Long id, @RequestBody Material material) {
        return materialService.updateMaterial(id, material);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
    }
}
