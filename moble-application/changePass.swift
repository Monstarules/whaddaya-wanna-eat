//
//  changePass.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/8/21.
//

import Foundation

struct changePassDetail:Encodable{
    var password:String
}

func createChangePassJson(password: String!) -> String! {
    return ("{\r\n  \"password\": \""+password+"\"\r\n}")
}
