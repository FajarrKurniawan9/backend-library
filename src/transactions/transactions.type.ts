export type TransactionType = 'borrow' | 'return';

export interface Transaction {
  id: number;
  bookId: number;
  membersId: number;
  type: TransactionType;
  borrowDate: Date;
  returnDate?: Date;
}
