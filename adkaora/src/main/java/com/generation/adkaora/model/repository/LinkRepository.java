package com.generation.adkaora.model.repository;

import com.generation.adkaora.model.entities.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LinkRepository extends JpaRepository<Link, Long> {
    Optional<Link> findAllByShortenedUrl(String shortenedUrl); // optional rappresenta un contenitore per un valore
                                                                //che potrebbe essere assente
    Link findByFirstUrl(String longUrl);

    Link findByShortenedUrl(String shortenedUrl);
}
