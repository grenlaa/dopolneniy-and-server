package com.example.Server.repo;

import com.example.Server.models.Competition;
import org.springframework.data.repository.CrudRepository;

public interface CompetitionRepository extends CrudRepository <Competition,Long> {
}
