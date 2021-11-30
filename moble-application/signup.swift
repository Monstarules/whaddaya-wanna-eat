//
//  signup.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/8/21.
//

import Foundation

struct signUpDetail: Codable{
    var first_name:String
    var last_name:String
    var email:String
    var phone_number:String
    var password:String
    var username:String
    var req: String

}
func createSignJSON(first_name: String!, last_name: String!, email: String!, phone_number:String!, password: String!, username: String!, req: String!) -> String! {
    let s1: String! = ("{\r\n  \"email\": \""+email+"\",\r\n  \"username\": \""+username)
    let s2: String! = ("\",\r\n  \"password\": \""+password+"\",\r\n  \"first_name\": \""+first_name)
    let s3: String! = ("\",\r\n  \"last_name\": \""+last_name!+"\",\r\n  \"phone_number\": \""+phone_number!+"\",\r\n  \"required\": true\r\n}")
    
    let finalString: String! = s1 + "" + s2 + "" + s3
    return finalString
}
