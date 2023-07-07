//랭킹 확인
function selectTierCodeByRank(rank) {
	const rank_tbody = document.querySelector('#rankTbody');
	rank_tbody.replaceChildren();
	//ajax start
	$.ajax({
		url: '/league/selectTierCodeByRankAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'tierCode': rank.value }, //필요한 데이터
		success: function(result) {
			let str = '';
			if(result.length != 0){
				result.forEach(function(mem, idx) {
					str += '<tr>';
					str += `<td>${idx+1}</td>`;
					str += `<td>${mem.memberName}</td>`;
					str += `<td>${mem.tierVO.tierName}</td>`;
					str += `<td>${mem.memPoint}</td>`;
					str += '</tr>';
				});
			}
			else{
				str += '<tr>';
				str += '<td colspan="4">조건에 일치하는 선수가 없습니다.</td>';
				str += '<tr>';
			}
			
			rank_tbody.insertAdjacentHTML('afterbegin',str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end



}