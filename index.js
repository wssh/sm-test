module.exports = function smTest(dispatch) {
	
	let CID = null;
	let boss = undefined;
	let teleLocation = null;
	
	const duchId = [488, 10];
	const dukeId = [488, 13];
	const malId = [488, 18];
	
	var duchBool = false;
	
	let smX = 73727;
	let smY = 15726;
	let smZ = 2606;
	let smW = 0;
	
	let duchX = 71781.3203125;
	let duchY = 29866.15234375;
	let duchZ = 4101.84716796875;
	let duchW = 24865;
	
	let dukeX = 74151.2734375;
	let dukeY = 29358.30859375;
	let dukeZ = 4102.72998046875;
	let dukeW = 1964;
	
	let melX = 65323.453125;
	let melY = 22964.2109375;
	let melZ = 3323.016845703125;
	let melW = 32086;
	
	dispatch.hook('S_LOGIN', 1, event => {
		CID = event.cid;
	})
	
    dispatch.hook('S_SPAWN_ME', 1, event => {
        if(smX == event.x && smY == event.y && smZ == event.z)
        {
            duchTele();
            return false;
        }
		//console.log(event.x + ' ' + event.y + ' ' + event.z + ' ' + event.w);
    })

	
	dispatch.hook('S_BOSS_GAGE_INFO', 2, (event) => {
		if (event.huntingZoneId === duchId[0] && event.templateId === duchId[1]) {
			boss = event;
		}
		
		else if (event.huntingZoneId === dukeId[0] && event.templateId === dukeId[1]){
			boss = event;
		}
		
		else if (event.huntingZoneId === malId[0] && event.templateId === malId[1]){
			boss = event;
		}
			
		
		if (boss) {
			let bossHp = bossHealth();
			if (bossHp <= 0 && duchBool == false && boss.huntingZoneId === duchId[0] && boss.templateId === duchId[1]) {
				boss = undefined;
				duchBool = true;
				dukeTele();
			}
			else if (bossHp <= 0 && duchBool == true && boss.huntingZoneId === dukeId[0] && boss.templateId === dukeId[1]){
				boss = undefined;
				malTele();
			}
			else if (bossHp <= 0 && boss.huntingZoneId === malId[0] && boss.templateId === malId[1]){
				boss = undefined;
			}
		}
	 })
	 
	 	
	function bossHealth() {
		return (boss.curHp / boss.maxHp);
	}
	
	function duchTele()
	{
		dispatch.toClient('S_SPAWN_ME', 1, {
			target: CID,
			x: duchX,
			y: duchY,
			z: duchZ,
			w: duchW,
			alive: 1,
			unk: 0
		})
	}
	
		function dukeTele()
	{
		/*dispatch.toClient('S_SPAWN_ME', 1, {
			target: CID,
			x: dukeX,
			y: dukeY,
			z: dukeZ,
			w: dukeW,
			alive: 1,
			unk: 0*/
			
		teleLocation = {
			x: dukeX,
			y: dukeY,
			z: dukeZ
		};
		dispatch.toClient('S_INSTANT_MOVE', 1, Object.assign(teleLocation, { id: cid}))
	}
	
		function malTele()
	{
		/*dispatch.toClient('S_SPAWN_ME', 1, {
			target: CID,
			x: melX,
			y: melY,
			z: melZ,
			w: melW,
			alive: 1,
			unk: 0
		})*/
		
		teleLocation = {
			x: melX,
			y: melY,
			z: melZ
		};
		dispatch.toClient('S_INSTANT_MOVE', 1, Object.assign(teleLocation, { id: cid}))
		duchBool = false;
	}
}

