//
//  profileViewController.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 10/25/21.
//

import UIKit


class profileViewController: UIViewController {

    @IBOutlet weak var fNameLabel: UILabel!
    @IBOutlet weak var lNameLabel: UILabel!
    @IBAction func startParty(_ sender: Any) {
    }

    //outlets
    @IBOutlet weak var viewOrange: UIView!
    @IBOutlet weak var nameBtn: UIButton!
    @IBOutlet weak var passBTN: UIButton!
    @IBOutlet weak var viewSlate: UIView!
    @IBOutlet weak var nameView: UIView!
    @IBOutlet weak var logOut: UIButton!
    @IBOutlet weak var tanView: UIView!
    
    //global variables
    static var tTokens = ""
    static var fullFName = ""
    static var fullLName = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //rounded buttons and views
        viewOrange.layer.cornerRadius = 10
        viewOrange.layer.masksToBounds = true
        viewSlate.layer.cornerRadius = 10
        viewSlate.layer.masksToBounds = true
        nameBtn.layer.cornerRadius = 10
        nameBtn.layer.masksToBounds = true
        passBTN.layer.cornerRadius = 10
        passBTN.layer.masksToBounds = true
        logOut.layer.cornerRadius = 10
        logOut.layer.masksToBounds = true
        nameView.layer.cornerRadius = 10
        nameView.layer.masksToBounds = true
        tanView.layer.cornerRadius = 10
        tanView.layer.masksToBounds = true

        //gets the token from when the user logs in from the ViewController
        let tokens = ViewController.token
        var fHalfToken = ""
        if let range = tokens.range(of: "token"){
            let token = tokens[range.upperBound...]
            fHalfToken = String((token.dropFirst(3)))
         }
        if let range = fHalfToken.range(of: "message"){
            let restToken = fHalfToken[..<range.lowerBound]
            profileViewController.tTokens = String(restToken.dropLast(3))
        }
        
        //calls the fetchProfileData func
        var statusProfile = ""
        profileViewController.fetchProfileData(completion: {String in

            statusProfile = String
        })
        while(statusProfile == ""){}

        //this produces the first and last name on the screen
        var fHalf = ""
        if let range = statusProfile.range(of: "first_name"){
                let firstN = statusProfile[range.upperBound...]
                fHalf = String((firstN.dropFirst(3)))
        }
        
        if let range = fHalf.range(of:"last_name"){
            let fName = fHalf[..<range.lowerBound]
            profileViewController.fullFName = String(fName.dropLast(3))
        }
        
        
        var lHalf = ""
        if let range = statusProfile.range(of: "last_name"){
            let firstL = statusProfile[range.upperBound...]
            lHalf = String((firstL.dropFirst(3)))
        }
        
        if let range = lHalf.range(of: "email"){
            let lName = lHalf[..<range.lowerBound]
            profileViewController.fullLName = String(lName.dropLast(3))
        }
        
        changeNames()
  
    }
    
    
        static func fetchProfileData(completion: @escaping (String) -> (Void)){
            let url = URL(string: "https://waddaya-wanna-eat.herokuapp.com/api/users/getUser?")
            guard let requestUrl = url else{fatalError()}
            
            var request = URLRequest(url: requestUrl)
            request.httpMethod = "GET"
            request.setValue("Bearer \(profileViewController.tTokens)", forHTTPHeaderField: "Authorization")
            
            
            URLSession.shared.dataTask(with: request){ data, response, error in
                if let data = data, let returnedData = String(data: data, encoding: .utf8){
                   print("HTTP Response:\n\(returnedData)")
                 completion(returnedData)
                }
            }.resume()
        }

    func changeNames(){
        self.fNameLabel.text = profileViewController.fullFName.capitalized
        self.lNameLabel.text = profileViewController.fullLName.capitalized
    }
    

    

}
