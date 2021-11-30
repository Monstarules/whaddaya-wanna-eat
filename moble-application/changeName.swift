//
//  changeName.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/8/21.
//

import Foundation

struct changeNameDetail: Encodable{
    var first_name:String
    var last_name:String
}

func createChangeNameJSON(first_name: String!, last_name: String!) -> String!{
    return ("{\r\n  \"first_name\": \""+first_name+"\",\r\n  \"last_name\": \""+last_name+"\"\r\n}")
}
