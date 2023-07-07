package com.tennis.world.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardVO {
	private String boardNo;
	private String boardTitle;
	private String boardWriter;
	private String boardContent;
	private int readCnt;
	private String isNotice;
	private String regDate;
}
