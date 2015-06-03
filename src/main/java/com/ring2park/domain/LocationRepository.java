package com.ring2park.domain;

import java.util.List;

import com.ring2park.domain.Location;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface LocationRepository extends CrudRepository<Location, Integer> {

    List<Location> findByCountry(@Param("country") String country);
    List<Location> findByCity(@Param("city") String city);

}
