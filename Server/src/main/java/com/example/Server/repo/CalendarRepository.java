package com.example.Server.repo;

import com.example.Server.models.Calendar;
import org.springframework.data.repository.CrudRepository;

public interface CalendarRepository extends CrudRepository<Calendar,Long> {
}
