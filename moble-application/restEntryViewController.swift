//
//  restEntryViewController.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 10/25/21.
//

import UIKit

class restEntryViewController: UIViewController, UITextFieldDelegate {

    //outlets
    @IBOutlet weak var restText2: UITextField!
    @IBOutlet weak var submitEat2: UIButton!
    @IBOutlet weak var codeLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //rounded buttons and textfields
        restText2.layer.cornerRadius = 4
        restText2.clipsToBounds = true
        submitEat2.layer.cornerRadius = 10
        submitEat2.layer.masksToBounds = true
        
        //calls the func below
        var code = ""
        fetchCreatePartyData(completion: {String in
            code = String
        })
        
        //takes the actual code through finding it in the String above
        var codeFHalf = ""
        if let range = code.range(of: "code"){
            let ccFH = code[range.upperBound...]
            codeFHalf = String(ccFH.dropFirst(3))
        }
        var codeSHalf = ""
        if let range = codeFHalf.range(of: "User_IDs"){
            let ccSH = codeFHalf[..<range.lowerBound]
            codeSHalf = String(ccSH.dropLast(3))
        }
        
        //displays the code on screen
        self.codeLabel.text = codeSHalf
        
        //for keyboard dismissing purposes
        restText2.delegate = self

    }

    @IBAction func submit2(_ sender: Any) {
        //for keyboard dismissing purposes
        hideKeyboard()
        
    }
    
    
    func fetchCreatePartyData(completion: @escaping (String) -> (Void)){
        let url = URL(string: "https://waddaya-wanna-eat.herokuapp.com/api/party/create")
        guard let requestUrl = url else{fatalError()}
        
        var request = URLRequest(url:requestUrl)
        request.httpMethod = "POST"
        request.setValue("Bearer \(profileViewController.tTokens)", forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request){ data, response, error in
            if let data = data, let returnedData = String(data: data, encoding: .utf8){
                print("HTTP Response for create party: \(returnedData)")
                completion(returnedData)
            }
        }.resume()
        
    }
    
    //for keyboard dismissing purposes
    func hideKeyboard(){
        restText2.resignFirstResponder()
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        hideKeyboard()
        return true
    }
    
}
