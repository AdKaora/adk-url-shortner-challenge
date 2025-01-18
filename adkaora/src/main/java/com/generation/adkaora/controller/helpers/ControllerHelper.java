package com.generation.adkaora.controller.helpers;

import com.generation.adkaora.model.entities.Link;

import java.util.List;

public interface ControllerHelper
{
    List<Link> findAllLinks();

    Link saveLink(Link link);

    boolean findByShortenedUrl(String shortenedUrl);
    Link findByLongLink(String longLink);

    Link findLongLinkByShortLink(String shortLink);
}
