package com.generation.adkaora.controller.helpers;

import com.generation.adkaora.model.entities.Link;

import java.util.List;

public interface ControllerHelper
{
    Link saveLink(Link link);

    boolean findByShortenedUrl(String shortenedUrl);
}
