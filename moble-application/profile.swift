//
//  profile.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/8/21.
//

import Foundation

struct profileDetail: Decodable{
    var first_name:String
    var last_name:String

}

func createProfileJSON(first_name: String!, last_name: String!) -> String! {
    return ("{\r\n  \"first_name\": \""+first_name+"\",\r\n  \"last_name\": \""+last_name+"\"\r\n}")
}
