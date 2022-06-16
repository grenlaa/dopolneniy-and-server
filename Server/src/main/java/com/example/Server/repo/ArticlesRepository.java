package com.example.Server.repo;

import com.example.Server.models.Articles;
import org.springframework.data.repository.CrudRepository;

public interface ArticlesRepository extends CrudRepository<Articles,Long> {
}
