package com.generation.adkaora.controller;

import com.generation.adkaora.controller.helpers.ControllerHelper;
import com.generation.adkaora.model.entities.Link;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/api/links")
public class LinkController
{
    @Autowired
    ControllerHelper ch;

    @GetMapping("/{longLink}")
    public Link getShortLink(@PathVariable String longLink){return ch.findShortLinkByLongLink(longLink);}

    @GetMapping("/{shortLink}")
    public Link getLongLink(@PathVariable String shortLink){return  ch.findLongLinkByShortLink(shortLink);}

    @PostMapping
    public Link createShortLink(@RequestBody String longLink)
    {
        Link link = new Link();
        link.setFirstUrl(longLink);
        String shortLink = "https://short.ly/";
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
            shortLink += sb.toString();
        } while(ch.findByShortenedUrl(shortLink));

        link.setShortenedUrl(shortLink);
        return ch.saveLink(link);
    }
}
