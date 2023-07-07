//회원 검색
function getSearchValue() {
	const search_key_word = document.querySelector('#searchKeyWord').value;
	const search_value = document.querySelector('#searchValue').value;

	if (search_value == '') {
		swal.fire({
			title: "에러.",
			html: "빈 값은 입력 될 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		getSearchValueAjax(search_key_word, search_value);
	}




}
//검색 Ajax
function getSearchValueAjax(search_key_word, search_value) {
	const black_tbody = document.querySelector('#blackTbody');
	//ajax start
	$.ajax({
		url: '/admin/getSearchValueAjax', //요청경로
		type: 'post',
		async: false,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'searchKeyWord': search_key_word, 'searchValue': search_value }, //필요한 데이터
		success: function(result) {
			black_tbody.replaceChildren();
			let str = '';
			result.forEach(function(member) {
				str += '<tr>';
				str += `<td>${member.memberCode}</td>`;
				str += `<td><a href="javascript:void(0)" onclick="openBlackForm('${member.memberId}');">${member.memberId}</a></td>`;
				str += `<td>${member.memberName}</td>`;
				str += `<td>${member.blackCnt}</td>`;
				str += '</tr>';
			});
			black_tbody.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//검색 초기화
function resetSearchValue() {
	location.href = '/admin/regBlackListForm';
}

//블랙포인트 등록 페이지 모달 열기
function openBlackForm(member_id) {
	document.querySelector('#memberId').value = member_id;
	document.querySelector('#blackComment').value = '';
	const black_modal = new bootstrap.Modal('#regBlackModal');
	let str = '';
	const reason_tbody = document.querySelector('#reasonTbody');
	reason_tbody.replaceChildren();
	getBlackReasonList(member_id, function(result) {
		console.log(result);
		if (result.length != 0) {
			result.forEach(function(black, idx) {
				str += '<tr>';
				str += `<td>${idx + 1}</td>`;
				str += `<td>${black.blackDate}</td>`;
				str += `<td>${black.blackComment}</td>`;
				str += `<td><input type="button" class="btn btn-primary" value="취소" onclick="cancelRegBlackList('${black.blackCode}');"></td>`;
				str += '</tr>';
			});
		}
		else if (result.length == 0) {
			str += '<tr>';
			str += '<td colspan="4">이력이 없습니다</td>';
			str += '</tr>';
		}
	});
	reason_tbody.insertAdjacentHTML('afterbegin', str);
	black_modal.show();
}

//회원의 누적사유 확인
function getBlackReasonList(member_id, callback) {
	//ajax start
	$.ajax({
		url: '/admin/getBlackReasonListAjax', //요청경로
		type: 'post',
		async: false,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'memberId': member_id }, //필요한 데이터
		success: function(result) {
			callback(result);
			//콜백 함수 써야지만 가능함.
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//블랙리스트 등록
function regBlackList() {
	const member_id = document.querySelector('#memberId').value;
	const black_comment = document.querySelector('#blackComment').value;
	if (black_comment == '') {
		swal.fire({
			title: "빈값 입력은 불가합니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		regBlackListAjax(member_id, black_comment);
	}
}

//등록 Ajax
function regBlackListAjax(member_id, black_comment) {
	swal.fire({
		title: "블랙리스트 등록",
		text: "등록하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/admin/regBlackListAjax', //요청경로
				type: 'post',
				async: false,
				contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'memberId': member_id, 'blackComment': black_comment }, //필요한 데이터
				success: function(result) {
					if (result == 2) {
						swal.fire({
							title: "제명 완료.",
							html: "선택하신 회원이<br>제명처리 되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							location.href = '/admin/regBlackListForm';
						});

					}
					else {
						swal.fire({
							title: "경고 완료.",
							html: "선택하신 회원이<br> 경고처리 되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							location.href = '/admin/regBlackListForm';
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

	});

}

//경고 취소하기
function cancelRegBlackList(black_code) {
	const member_id = document.querySelector('#memberId').value;
	swal.fire({
		title: "경고 취소",
		text: "경고를 취소하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			cancelRegBlackListAjax(black_code, member_id);
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "승인이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
			return
		}
	});
}
//취소 처리
function cancelRegBlackListAjax(black_code, member_id) {
	//ajax start
	$.ajax({
		url: '/admin/cancelRegBlackListAjax', //요청경로
		type: 'post',
		async: false,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'blackCode': black_code, 'memberId': member_id }, //필요한 데이터
		success: function(result) {
			if (result == 3) {
				swal.fire({
					title: "복구 완료.",
					html: "선택하신 회원이<br> 복구처리 되었습니다.",
					icon: 'success',
					button: '확인',
				}).then((r) => {
					location.href = '/admin/regBlackListForm';
				});
			}
			else{
				swal.fire({
					title: "취소 완료.",
					html: "선택하신 회원의<br> 경고가 취소 처리 되었습니다.",
					icon: 'success',
					button: '확인',
				}).then((r) => {
					location.href = '/admin/regBlackListForm';
				});
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}






