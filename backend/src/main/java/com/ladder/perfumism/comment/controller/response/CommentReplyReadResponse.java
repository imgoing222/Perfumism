package com.ladder.perfumism.comment.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ladder.perfumism.comment.domain.Comment;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class CommentReplyReadResponse {

    @JsonProperty("comment_id")
    @ApiModelProperty(position = 0, notes = "댓글 ID", example = "1")
    private Long commentId;

    @JsonProperty("member_id")
    @ApiModelProperty(position = 1, notes = "멤버 ID", example = "1")
    private Long memberId;

    @JsonProperty("member_name")
    @ApiModelProperty(position = 2, notes = "멤버 이름", example = "우사앙주운")
    private String memberName;

    @JsonProperty("article_id")
    @ApiModelProperty(position = 3, notes = "게시글 ID", example = "1")
    private Long articleId;

    @JsonProperty("main_comment_id")
    @ApiModelProperty(position = 4, notes = "댓글 ID", example = "1")
    private Long mainCommentId;

    @JsonProperty("content")
    @ApiModelProperty(required = true, position = 5, notes = "내용", example = "나는 쓴다 댓글 여기에")
    private String content;

    @JsonProperty("createAt")
    @ApiModelProperty(position = 6, notes = "생성 시간", example = "2022,3,13,14,59,51,0000000")
    private LocalDateTime createAt;

    @JsonProperty("updateAt")
    @ApiModelProperty(position = 7, notes = "수정 시간", example = "2023,4,14,14,59,51,0000000")
    private LocalDateTime updateAt;

    public CommentReplyReadResponse(){

    }

    public CommentReplyReadResponse(
        Long commentId, Long memberId, String memberName, Long articleId,
        Long mainCommentId, String content, LocalDateTime createAt, LocalDateTime updateAt){
        this.commentId = commentId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.articleId = articleId;
        this.mainCommentId = mainCommentId;
        this.content = content;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public static CommentReplyReadResponse from(Comment comment){
        return new CommentReplyReadResponse(
            comment.getId(),
            comment.getMember().getId(),
            comment.getMember().getUsername(),
            comment.getArticle().getId(),
            comment.getMainComment().getId(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt()
        );
    }
}
