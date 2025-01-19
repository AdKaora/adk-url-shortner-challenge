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
    public List<Link> findAllLinks(){
        return lRepo.findAll();
    }

    @Override
    public Link saveLink(Link link){return lRepo.save(link);}

    @Override
    public boolean findByShortenedUrl(String shortenedUrl){return lRepo.findAllByShortenedUrl(shortenedUrl).isPresent();}

    @Override
    public Link findByLongLink(String longLink){return lRepo.findByFirstUrl(longLink);}

    @Override
    public Link findLongLinkByShortLink(String shortLink){return lRepo.findOneByShortenedUrl(shortLink);}
}
