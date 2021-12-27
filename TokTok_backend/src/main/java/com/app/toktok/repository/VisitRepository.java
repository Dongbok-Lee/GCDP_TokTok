package com.app.toktok.repository;

import com.app.toktok.model.VisitInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<VisitInfo,Integer> {

}
