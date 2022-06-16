package com.example.Server.repo;

import com.example.Server.models.HealthRecipe;
import org.springframework.data.repository.CrudRepository;

public interface HealthRecipeRepository extends CrudRepository<HealthRecipe, Long> {
}
