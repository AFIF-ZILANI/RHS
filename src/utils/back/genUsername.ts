// type = student - [A] or teacher - [B] or other stafe - [C]
// uniqueId = Inex of indivisual user => [aXXXXXXXX or bXXXXXXXX or cXXXXXXXX]
// type:uniqueId

import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";

function Genusername() {
    try {
        const element = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0",
        ];
        const arr = []
        let state = true
        while (state) {
            let i = 0
            while ( i < 9) {
                const index = Math.round(Math.random() * 61)
                arr.push(element[index])
                i++
            }
            const res = arr.join("")
            console.log(res)
            const student = Student.findOne({username: res})
            const teacher = Teacher.findOne({username: res})
            if (!student && !teacher){
                state = false
                return res
            }
        }
    } catch (error) {}
}

Genusername()