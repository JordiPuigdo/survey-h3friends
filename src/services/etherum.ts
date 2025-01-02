import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers";

let signer: ethers.Signer;
let surveyContract: ethers.Contract;

const CONTRACT_ADDRESS = "0x3216B3eC43829DEb1863acaAB76AF51a667C6E1B";
const CONTRACT_ABI = [
  // ABI del contrato Survey (el que generaste al compilar)
  "function addQuestion(string memory _text) public",
  "function voteYes(uint256 _questionId) public",
  "function voteNo(uint256 _questionId) public",
  "function getQuestionsCount() public view returns (uint256)",
  "function questions(uint256) public view returns (string memory, uint256, uint256)",
];

export const initEthereum = async () => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const signer = await provider.getSigner(3);

  surveyContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const addQuestion = async (questionText: string) => {
  if (!surveyContract) {
    throw new Error(
      "Survey contract is not initialized. Call initEthereum first."
    );
  }
  const tx = await surveyContract.addQuestion(questionText);
  await tx.wait();
  console.log("Question added");
};
export const voteYes = async (questionId: number) => {
  const tx = await surveyContract.voteYes(questionId);
  await tx.wait();
  console.log("Voted Yes");
};

export const voteNo = async (questionId: number) => {
  const tx = await surveyContract.voteNo(questionId);
  await tx.wait();
  console.log("Voted No");
};

export const getQuestionsCount = async () => {
  const count = await surveyContract.getQuestionsCount();
  console.log("Total questions:", count.toString());
  return count;
};

export const getQuestion = async (questionId: number) => {
  const question = await surveyContract.questions(questionId);
  console.log("Question:", question);
  return question;
};
