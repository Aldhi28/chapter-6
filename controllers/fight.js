require('dotenv').config()
const jwt = require('jsonwebtoken')
const {APP_SECRET} = process.env
const bcrypt = require('bcrypt')
const { UserGameHistory, Room } = require('../models');


function getHasil(player1, player2) {
    if (player1 == player2) return 'SERI';
    if (player1 == 'batu') return (player2 == 'gunting') ? 'PLAYER 1 MENANG!' : 'PLAYER 2 MENANG!';
    if (player1 == 'kertas') return (player2 == 'batu') ? 'PLAYER 1 MENANG!' : 'PLAYER 2 MENANG!';
    if (player1 == 'gunting') return (player2 == 'kertas') ? 'PLAYER 1 MENANG!' : 'PLAYER 2 MENANG!';
  }



const fight = async(req,res,next) => {
    try{
        const { id } = req.params;
        const { pilihan } = req.body;
        const dataUser = req.user;
        const find = await Room.findOne({
            where:{
                id,
            }
        });

        if(!find) {
            throw {
                message:`room not exists`,
                code:400,
                error: `bad request`,
            }
        }

        if(find.winner){
            res.json({
                msg: `pertandingan untuk room ${id} sudah selesai yang di menangkan oleh ${find.winner}`,
            })
        }

        const isHistoryExists = await UserGameHistory.findAll({
            where:{
                roomId: find.id
            }
        })

        if(isHistoryExists.length === 0){
            const createHistory = await UserGameHistory.create({
                player_1: pilihan,
                user_1: dataUser.id,
                roomId: find.id
            })

            res.json({
                msg: "menunggu lawan",
                createHistory
            })
        }else{
            if(isHistoryExists.length === 1){
                if(isHistoryExists[0].user_1 && isHistoryExists[0].user_2){
                    const createHistory = await UserGameHistory.create({
                        player_1: pilihan,
                        user_1: dataUser.id,
                        roomId: find.id
                    })

                    res.json({
                        msg: "menunggu lawan",
                        createHistory
                    })
                }else{
                    const pilihanPlayerSatu = isHistoryExists[0].player_1;
                    const winner = getHasil(pilihanPlayerSatu, pilihan);
                    console.log("pilihanPlayerSatu",pilihanPlayerSatu, pilihan, winner)
                    await UserGameHistory.update({
                        player_2: pilihan,
                        user_2: dataUser.id,
                        winner: winner
                    },{
                        where:{
                            id: isHistoryExists[0].id
                        }
                    })

                    res.json({
                        msg: "pemenang",
                        winner
                    })
                }
            }else if(isHistoryExists.length === 2){
                if(isHistoryExists[1].user_1 && isHistoryExists[1].user_2){
                    const createHistory = await UserGameHistory.create({
                        player_1: pilihan,
                        user_1: dataUser.id,
                        roomId: find.id
                    })

                    res.json({
                        msg: "menunggu lawan",
                        createHistory
                    })
                }else{
                    const pilihanPlayerSatu = isHistoryExists[1].player_1;
                    const winner = getHasil(pilihanPlayerSatu, pilihan);
                    console.log("pilihanPlayerSatu",pilihanPlayerSatu, pilihan, winner)
                    await UserGameHistory.update({
                        player_2: pilihan,
                        user_2: dataUser.id,
                        winner: winner
                    },{
                        where:{
                            id: isHistoryExists[1].id
                        }
                    })

                    res.json({
                        msg: "pemenang",
                        winner
                    })
                }
            }else if(isHistoryExists.length === 3){
                if(isHistoryExists[2].user_1 && isHistoryExists[2].user_2){
                    const createHistory = await UserGameHistory.create({
                        player_1: pilihan,
                        user_1: dataUser.id,
                        roomId: find.id
                    })

                    res.json({
                        msg: "menunggu lawan",
                        createHistory
                    })
                }else{
                    const pilihanPlayerSatu = isHistoryExists[2].player_1;
                    const winner = getHasil(pilihanPlayerSatu, pilihan);
                    console.log("pilihanPlayerSatu",pilihanPlayerSatu, pilihan, winner)
                    const updateHistory = await UserGameHistory.update({
                        player_2: pilihan,
                        user_2: dataUser.id,
                        winner: winner
                    },{
                        where:{
                            id: isHistoryExists[2].id
                        }
                    })

                    if(updateHistory){
                        const dataHistory = await UserGameHistory.findAll({
                            where:{
                                roomId: find.id
                            },
                            raw: true
                        })
    
                        let countPlayer1 = 0; // 2
                        let countPlayer2 = 0; // 1
                        let winnernya = "";
    
                        console.log("dataHistory",dataHistory)
    
                        dataHistory.forEach((data)=>{

                            console.log("debug data", data);
                            if(data.winner === "PLAYER 1 MENANG!"){
                                countPlayer1 = countPlayer1 + 1;
                                console.log("countp1", countPlayer1)
                            }else if(data.winner === "PLAYER 2 MENANG!"){
                                countPlayer2 = countPlayer2 + 1;
                                console.log("countp2", countPlayer2)

                            }
                        })
    
                        if(countPlayer1 === countPlayer2){
                            winnernya = "seri";
                        }else if(countPlayer1 > countPlayer2){
                            winnernya = "player 1";
                        }else{
                            winnernya = "player 2";
                        }
    
                        const updateRoom = Room.update({
                            winner: winnernya
                        },{
                            where:{
                                id: find.id
                            }
                        })
    
                        res.json({
                            msg: "pemenang",
                            winner,
                            totalWinner: winnernya,
                            updateRoom
                        })
                    }

                   
                }
            }
        }

        // if(!find.user_1){
        //     const updateRoomUserOne = await find.update({
        //         user_1: dataUser.id
        //     })

        //     const insertGameHistory = await UserGameHistory.create({
        //         player_1: pilihan,
        //         roomId: find.id
        //     })

        //     res.json({
        //         "msg":"menunggu lawan",
        //         updateRoomUserOne,
        //         insertGameHistory
        //     })
        // }else{
        //     const updateRoomUsertwo = await find.update({
        //         user_2: dataUser.id
        //     })

        //     const findGameHistory = await UserGameHistory.findAll({
        //         where: {
        //             roomId: find.id
        //         }
        //     })

        //     if(findGameHistory.length === 1){

        //     }

        //     // const insertGameHistory = await UserGameHistory.create({
        //     //     player_1: pilihan,
        //     //     roomId: find.id
        //     // })

        //     res.json({
        //         "msg":"tes",
        //         updateRoomUsertwo,
        //         findGameHistory,
        //     })
        // }
    
    
        res.json({
            "tes":"a",
            pilihan,
            id: find,
            isHistoryExists
        })
    }catch(error){
        next(error)
    }

}

module.exports = { fight }