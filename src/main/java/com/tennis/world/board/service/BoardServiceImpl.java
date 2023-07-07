package com.tennis.world.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tennis.world.board.vo.BoardVO;
import com.tennis.world.board.vo.ReplyVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService{
	@Autowired
	private SqlSessionTemplate sqlsession;
	
	//게시글 목록 페이지
	@Override
	public List<BoardVO> getBoardList(String isNotice) {
		return sqlsession.selectList("boardMapper.getBoardList",isNotice);
	}
	
	//게시글 등록
	@Override
	public int regBoard(BoardVO boardVO) {
		return sqlsession.insert("boardMapper.regBoard",boardVO);
	}
	
	//조회수 업데이트
	@Override
	public int setReadCnt(String boardNo) {
		return sqlsession.update("boardMapper.setReadCnt",boardNo);
	}
	
	//게시글 상세정보
	@Override
	public BoardVO getBoardDetail(String boardNo) {
		return sqlsession.selectOne("boardMapper.getBoardDetail",boardNo);
	}
	
	//댓글 정보
	@Override
	public List<ReplyVO> getReplyListByBoard(String boardNo) {
		return sqlsession.selectList("boardMapper.getReplyListByBoard",boardNo);
	}
	
	//댓글 등록
	@Override
	public int regReply(ReplyVO replyVO) {
		return sqlsession.insert("boardMapper.regReply",replyVO);
	}
	
	//댓글 수정
	@Override
	public void updateReply(ReplyVO replyVO) {
		sqlsession.update("boardMapper.updateReply",replyVO);
		
	}
	
	//댓글 삭제
	@Override
	public void deleteReply(ReplyVO replyVO) {
		sqlsession.delete("boardMapper.deleteReply",replyVO);
		
	}
	
	//게시글 수정
	@Override
	public int updateBoard(BoardVO boardVO) {
		return sqlsession.update("boardMapper.updateBoard",boardVO);
	}
	
	//게시글 삭제
	@Override
	public int delBoard(String boardNo) {
		return sqlsession.delete("boardMapper.delBoard",boardNo);
	}
	
	//공지사항 등록
	@Override
	public int regNoticeBoard(BoardVO boardVO) {
		return sqlsession.insert("boardMapper.regNoticeBoard",boardVO);
	}
	
}
