# NotaryProject-Blockchain-4
#Description of Smart Contract
AgreementB00880866Contract is my smart contract in which there are 5 method functions which works as implementation of the contract properties. 

**CreateAgreementB00880866** is a method where it has 3 inputs agreementId, message, notary. This method first checks if their is an existing 
agreement on the entered agreementId and validates accordingly by printing (1) 
The agreement $agreementId already exists or (2) it will create a new agreement by initializing AgreementB00880866 objects which are hashcode(as message),
seller, notary, buyer as notary initially, buyerStatus (pending), sellerStatus (pending).

**readAgreementB00880866** is a method where it has 1 input assignmentTwoId in this method it checks if there is an agreement on the inputted
value and prints the details of the agreement if doesn’t exists prints a validation statement as does not exist.

**approvedAgreement** is a method where it validates the agreement if exists takes three inputs agreementId, senderType, sender - if senderType is SELLER then
it will flag the approve of seller status, if it reads senderType as BUYER then it flags the approve status of buyer.

**declineAgreement** is a method where it validates the agreement if exists takes three inputs agreementId, senderType, sender - if senderType is SELLER then it will
flag the decline status of seller, if it reads senderType as BUYER then it flags the decline status of buyer.

**deleteAgreementB00880866** is a method which has 1 input take the assignmentTwoId validates if exists and if exists it will invoke deleteState which
deletes the agreement.

#Below are some screenshots of output screens

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/01c73ab6-a29a-40f8-abdd-f21c399e433f)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/b6b48de4-bc76-41c5-b633-871cc3e10180)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/f7ffff08-7114-4590-8066-4a781900db46)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/acd48daf-ad19-468d-a0a0-a4c4ca657591)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/a84e5ea0-d324-4a4a-95ba-9ed1730c4b1f)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/9752e8c5-cb26-4e80-a4dd-975a67ceee56)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/710ab752-2677-4a1a-b016-0476d5348fd1)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/eb3fe3b4-b722-4971-94cf-fee27cf61342)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/7caff797-2b75-4891-a6c4-7e717cfbf0b4)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/f5083beb-f18a-4ef6-95e7-fcd397c948ea)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/27ce3504-2418-4b91-ba18-bc81a2b19b5b)

![image](https://github.com/krishnatejakittu/NotaryProject-Blockchain-4/assets/22345362/b5652261-f2e8-4796-88b5-3a7900f8577e)







