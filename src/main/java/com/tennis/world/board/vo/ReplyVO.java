package com.tennis.world.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyVO {
	private String replyNo;
	private String replyWriter;
	private String replyContent;
	private String regDate;
	private String boardNo;
}
