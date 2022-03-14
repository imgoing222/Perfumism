package com.ladder.perfumism.perfume.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import com.ladder.perfumism.member.domain.Member;
import com.ladder.perfumism.perfume.controller.dto.request.ReviewWriteRequest;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Getter
@Entity
@Where(clause = "deleted_at is null")
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @ManyToOne(targetEntity = Perfume.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "perfume_id")
    private Perfume perfumeId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    @Column(name = "grade")
    private Integer grade;

    @Lob
    @Column(name = "content")
    private String content;

    public Review() {
    }

    @Builder
    public Review(Perfume perfumeId, Member memberId, Integer grade, String content) {
        this.perfumeId = perfumeId;
        this.memberId = memberId;
        this.grade = grade;
        this.content = content;
    }

    public static Review createReview(Perfume perfume, Member member, ReviewWriteRequest request) {
        return Review.builder()
            .perfumeId(perfume)
            .memberId(member)
            .grade(request.getGrade())
            .content(request.getContent())
            .build();
    }
}