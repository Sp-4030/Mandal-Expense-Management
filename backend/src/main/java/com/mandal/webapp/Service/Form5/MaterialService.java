package com.mandal.webapp.Service.Form5;


import com.mandal.webapp.Model.Form5.Material;
import com.mandal.webapp.Model.Form5.MaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    public Material addMaterial(Material material) {
        return materialRepository.save(material);
    }

    public Optional<Material> getMaterialById(Long id) {
        return materialRepository.findById(id);
    }

    public Material updateMaterial(Long id, Material updatedMaterial) {
        return materialRepository.findById(id).map(material -> {
            material.setName(updatedMaterial.getName());
            material.setMaterial(updatedMaterial.getMaterial());
            return materialRepository.save(material);
        }).orElse(null);
    }

    public void deleteMaterial(Long id) {
        materialRepository.deleteById(id);
    }
}
