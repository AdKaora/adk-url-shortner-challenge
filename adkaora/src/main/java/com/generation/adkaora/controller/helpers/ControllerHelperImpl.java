package com.generation.adkaora.controller.helpers;

import com.generation.adkaora.model.entities.Link;
import com.generation.adkaora.model.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ControllerHelperImpl implements ControllerHelper
{
    @Autowired
    LinkRepository lRepo;

    @Override
    public Link saveLink(Link link){return lRepo.save(link);}

    @Override
    public boolean findByShortenedUrl(String shortenedUrl){return lRepo.findAllByShortenedUrl(shortenedUrl).isPresent();}
}
