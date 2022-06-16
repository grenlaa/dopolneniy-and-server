package com.example.Server.repo;

import com.example.Server.models.Brain;
import org.springframework.data.repository.CrudRepository;

public interface BrainRepository extends CrudRepository <Brain,Long> {
}
