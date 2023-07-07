//게시글 등록
function regBoard(role) {
	const board_title = document.querySelector('#boardTitle').value;
	const board_content = document.querySelector('#boardContent').value;
	if (role == 'anonymousUser') {
		swal.fire({
			title: "로그인 한 회원만 등록이 가능합니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	if (board_title == '') {
		swal.fire({
			title: "제목은 빈값을 넣을 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	if (board_content == '') {
		swal.fire({
			title: "내용에 빈값을 넣을 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	let byte_data = getBytes(board_content);
	console.log(byte_data);
	if (byte_data >= 1000) {
		swal.fire({
			title: "1000바이트 이상은 입력불가합니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	else {
		swal.fire({
			title: "게시글 등록",
			text: "등록하시겠습니까?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소"
		}).then((r) => {
			if (r.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/board/regBoardAjax', //요청경로
					type: 'post',
					async: true,
					contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'boardTitle': board_title, 'boardContent': board_content }, //필요한 데이터
					success: function(result) {
						if (result == 1) {
							swal.fire({
								title: "등록이 완료되었습니다.",
								icon: 'success',
								button: '확인',
							}).then((r) => {
								location.href = "/board/boardForm";
							});

						}
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end
			}
			else if (r.isDismissed) {
				swal.fire({
					title: "등록이 취소되었습니다.",
					icon: 'success',
					button: '확인',
				});

			}
		})
	}


}

//게시글 상세보기
function boardDetail(board_no) {
	//ajax start
	$.ajax({
		url: '/board/setReadCntAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'boardNo': board_no }, //필요한 데이터
		success: function(result) {
			if (result == 1) {
				location.href = `/board/boardDetail?boardNo=${board_no}`;
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}

//공지 등록
function regNotice() {
	const board_title = document.querySelector('#boardTitle').value;
	const board_content = document.querySelector('#boardContent').value;
	const is_notice = 'Y';
	if (board_title == '') {
		swal.fire({
			title: "제목은 빈값을 넣을 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	if (board_content == '') {
		swal.fire({
			title: "내용에 빈값을 넣을 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	let byte_data = getBytes(board_content);
	console.log(byte_data);
	if (byte_data >= 1000) {
		swal.fire({
			title: "1000바이트 이상은 입력불가합니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		regNoticeAjax(board_title, board_content, is_notice);
	}
}
//공지 등록하기 Ajax
function regNoticeAjax(board_title, board_content, is_notice) {
	swal.fire({
		title: "공지 등록",
		text: "등록하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/board/regNoticeAjax', //요청경로
				type: 'post',
				async: false,
				//contentType : 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'boardTitle': board_title, 'boardContent': board_content, 'isNotice': is_notice }, //필요한 데이터
				success: function(result) {
					if (result == 1) {
						swal.fire({
							title: "등록이 완료되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r)=>{
							location.href = '/board/noticeBoardForm';
						});

					}
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "등록이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
			return
		}
	});
}


//바이트 수 계산
function getBytes(str) {
	let character;
	let charBytes = 0;

	for (let i = 0; i < str.length; i += 1) {
		character = str.charAt(i);

		if (escape(character).length > 4) charBytes += 3;
		else charBytes += 1;
	}

	return charBytes;
}