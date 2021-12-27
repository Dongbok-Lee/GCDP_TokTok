package com.app.toktok.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.lang.annotation.Documented;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class VisitInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = true, length = 100)
    private String shop_name;

    @Column(nullable = true, length = 100)
    private String shop_address;

    @Column(nullable = true, length = 100)
    private String user_name;

    @Column(nullable = true, length = 100)
    private String user_phone;

    @Column(nullable = true, length = 100)
    private String user_address;

    @CreationTimestamp
    private Timestamp createDate;
}
