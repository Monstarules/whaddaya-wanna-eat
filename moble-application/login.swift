//
//  login.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/8/21.
//

import Foundation


struct loginDetail:Codable{
    var username: String!
    var password: String!
}

func createLoginJSON (username: String!, password: String!) -> String! {
    return ("{\r\n  \"username\": \""+username+"\",\r\n  \"password\": \""+password+"\"\r\n}")
}
