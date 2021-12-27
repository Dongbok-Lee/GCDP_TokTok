package com.app.toktok.service;

import com.app.toktok.model.VisitInfo;
import com.app.toktok.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;

    @Transactional
    public void Save_Info(VisitInfo visitInfo){
        visitRepository.save(visitInfo);
    }
}
