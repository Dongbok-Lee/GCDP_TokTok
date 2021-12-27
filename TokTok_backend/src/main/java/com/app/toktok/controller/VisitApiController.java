package com.app.toktok.controller;

import com.app.toktok.model.VisitInfo;
import com.app.toktok.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VisitApiController {

    @Autowired
    private VisitService visitService;

    @PostMapping("/saveInfo")
    public String save(@RequestBody VisitInfo visitInfo){
        visitService.Save_Info(visitInfo);
        return "Save is complete!";
    }
}
