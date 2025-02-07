// ОПИСАНИЕ ЗАПРОСА С ИЗМЕНЕНИЕМ ИНФОРМАЦИИ

            const formData = new FormData();

            //В запросе ты указываешь новые данные для аккаунта пользователя, обязательный только ID, все остальное опционально

            // ВАЖНО
            // Если какие-то данные ты не хочешь менять, то просто не указывай их, не пиши null, его по идее не получится
            // передать через formData

            formData.append("ID", "70462838");
            formData.append("Username", "NewUsername");
            formData.append("Phone", "+380000000000");
            formData.append("Name", "SigmaName");
            formData.append("Surname", "SigmaSurname");
            formData.append("Fathername", "SigmaFathername");
            
            formData.append("Photo", photoInput.files[0]); // Передавай фото в формате png или jpg, иначе выдаст ошибку

            formData.append("Resume", resumeInput.files[0]); // Над форматом резюме подумать стоит, но пока передавай как pdf


            // Если ты хочешь какие-то данные именно очистить, чтобы в БД они были пустыми, то отправь 
            // массив буллов как показано ниже (если ничего не надо удалять, не отправляй его), 
            // каждая переменная отвечает за соответствующие данные начиная с Username, true - удалить, false - не трогать
            formData.append("FieldsToRemove", JSON.stringify([false, true, false, false, false, false]));

            const response2 = await fetch(url + "/api/EditProfile/EditProfileInfo", {
            method: "POST",
            body: formData,
             });

            if (response.ok) {
                console.log("OK: ", result.OKmessage);
            }
            else {
                const error = await response.json();
                const errorMessage = error.message;
                if(errorMessage == "FieldsToRemove is not correct")
                console.error("EROR:", errorData); // Массив буллов передан не корректно (длинна должна быть строго 6)
                else if(errorMessage == "Username is already taken")
                console.error("EROR:", errorMessage); // Юзернейм уже занят
                else if(errorMessage == "Unsupported photo extension")
                console.error("EROR:", errorMessage); // Расширение фото не подходит
                else if(errorMessage == "Unsupported resume file extension")
                console.error("EROR:", errorMessage); // Расширение файла не подходит
                else
                console.error("EROR:", errorMessage); 
            }