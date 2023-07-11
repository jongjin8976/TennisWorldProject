function checkClubName() {
	const club_name = document.querySelector('#clubName');
	const create_btn = document.querySelector('#createBtn');
	const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]{5,8}$/;
	if (club_name.value == '') {
		swal.fire({
			title: "빈값은 입력될 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (!club_name.value.match(regex)) {
		swal.fire({
			title: "규정에 맞지 않는 클럽명 입니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		//ajax start
		$.ajax({
			url: '/club/checkByClubNameAjax', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'clubName': club_name.value }, //필요한 데이터
			success: function(result) {
				if (result == 0) {
					swal.fire({
						title: "사용 가능한 클럽명입니다.",
						icon: 'success',
						button: '확인',
					}).then((r) => {
						create_btn.disabled = false;
						club_name.setAttribute('readonly', true);
					})
				}
				else {
					swal.fire({
						title: "중복된 클럽명입니다.",
						icon: 'error',
						button: '확인',
					});
					return
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end

	}
}
//클럽 등록
function createClub() {
	//ajax start
	$.ajax({
		url: '/club/checkClubValiByMemberAjax', //요청경로
		type: 'post',
		async: false,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(result) {
			if (result == 0) {
				const club_name = document.querySelector('#clubName').value;
				const club_personnel = document.querySelector('#clubPersonnel').value;
				const club_intro = document.querySelector('#clubIntro').value;

				if (club_personnel == '') {
					swal.fire({
						title: "클럽 정원을 지정해야 합니다.",
						icon: 'error',
						button: '확인',
					});
					return
				}
				else if(club_personnel > 30){
					swal.fire({
						title: "오류.",
						html:"30명 이상은 등록 할 수 없습니다.",
						icon: 'error',
						button: '확인',
					});
					return	
				}
				else if(club_personnel < 10){
					swal.fire({
						title: "오류.",
						html:"10명 이하는 등록 할 수 없습니다.",
						icon: 'error',
						button: '확인',
					});
					return	
				}
				else if (club_intro == '') {
					swal.fire({
						title: "소개글을 적어주세요.",
						icon: 'error',
						button: '확인',
					});
					return
				}
				else {
					//ajax start
					$.ajax({
						url: '/club/createClubAjax', //요청경로
						type: 'post',
						async: true,
						contentType: 'application/json; charset=UTF-8',
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						data: { 'clubName': club_name, 'clubPersonnel': club_personnel, 'clubIntro': club_intro }, //필요한 데이터
						success: function(result) {
							if (result == 1) {
								swal.fire({
									title: "클럽 등록이 완료 되었습니다.",
									icon: 'success',
									button: '확인',
								}).then((r) => {
									location.href = "/";
								});
							}
						},
						error: function() {
							alert('실패');
						}
					});
					//ajax end
				}
			}
			else {
				swal.fire({
					title: "클럽에 가입되어 있어 생성이 불가능합니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end








}
