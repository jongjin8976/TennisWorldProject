//랜덤 매칭 상대 찾기
function getRandomMatchMember(member_id) {
	swal.fire({
		title: "랜덤 매칭",
		text: "랜덤 매칭을 하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/match/valiRandomMatchPlayerAjax', //요청경로
				type: 'post',
				async: true,
				//contentType : 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'memberId': member_id }, //필요한 데이터
				success: function(result) {
					if (result == false) {
						swal.fire({
							html: "익일 매칭 내역이<br> 존재합니다.",
							icon: 'error',
							button: '확인',
						});
						return
					}
					else {
						//ajax start
						$.ajax({
							url: '/match/regRandomMatchPlayerAjax', //요청경로
							type: 'post',
							async: true,
							contentType: 'application/json; charset=UTF-8',
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							data: { 'memberId': member_id }, //필요한 데이터
							success: function(result) {
								if (result == true) {
									swal.fire({
										title: "매칭이 등록되었습니다.",
										icon: 'success',
										button: '확인',
									}).then((r)=>{
										location.href = '/';
									});

								}
								else{
									swal.fire({
										title: "매칭 가능한 인원이 없습니다.",
										icon: 'error',
										button: '확인',
									});
								}
							},
							error: function() {
								alert('실패');
							}
						});
						//ajax end

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
				title: "매칭이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
			return
		}
	});

}