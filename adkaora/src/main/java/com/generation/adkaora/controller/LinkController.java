package com.generation.adkaora.controller;

import com.generation.adkaora.controller.helpers.ControllerHelper;
import com.generation.adkaora.model.entities.Link;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/links")
public class LinkController
{
    @Autowired
    ControllerHelper ch;

    @GetMapping("/short/{shortLink}")
    public Link getLongLink(@PathVariable String shortLink){
        System.out.println("shortLink: "+shortLink);
        return  ch.findLongLinkByShortLink(shortLink);}

    @PostMapping
    public Link createShortLink(@RequestBody Link inputLink)
    {
        String longLink = inputLink.getFirstUrl();
        Link link = new Link();

        List<Link> allLinks = ch.findAllLinks();
        for(Link l : allLinks)
            if(l.getFirstUrl().equals(longLink))
                return ch.findByLongLink(longLink);

        link.setFirstUrl(longLink);
        String shortLink = "";
        int linkLength = 6;
        String alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

        do
        {
            StringBuilder sb = new StringBuilder(linkLength);
            Random rndm = new Random();
            for(int i = 0; i < linkLength; i++)
            {
                sb.append(alphaNumeric.charAt(rndm.nextInt(alphaNumeric.length())));

            }
            shortLink = sb.toString();
        } while(ch.findByShortenedUrl(shortLink));

        link.setShortenedUrl(shortLink);
        return ch.saveLink(link);
    }
}
