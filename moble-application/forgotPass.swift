//
//  forgotPass.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/8/21.
//

import Foundation

struct forgotPassDetail:Encodable{
    var email:String
}

func createFPassJSON(email: String!) -> String!{
    return ("{\r\n  \"email\": \""+email+"\"\r\n}")
}
