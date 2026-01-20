export type TransactionStatus = 'borrow' | 'return';

export type Transaction = {
  id: number;
  bookId: number;
  membersId: number;
  status: TransactionStatus;
  borrowDate: Date;
  returnDate?: Date;
};
