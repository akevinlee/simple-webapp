package com.ring2park.web;

import com.ring2park.config.AppSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @Autowired
    private AppSettings appSettings;

    @RequestMapping("/")
    public String home(Model model) {
        model.addAttribute("name", appSettings.getName());
        model.addAttribute("description", appSettings.getDescription());
        return "home";
    }

}