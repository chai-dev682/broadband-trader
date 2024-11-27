const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string'
      }
    ],
    name: 'ContractInactive',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'capacity',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'status',
        type: 'string'
      }
    ],
    name: 'ContractListed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      }
    ],
    name: 'ContractSold',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'currency',
        type: 'string'
      }
    ],
    name: 'MaintenanceFeePaid',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'paymentType',
        type: 'string'
      }
    ],
    name: 'PaymentReceived',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'newStatus',
        type: 'string'
      }
    ],
    name: 'StatusUpdated',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_contractID',
        type: 'uint256'
      }
    ],
    name: 'buyContract',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'contracts',
    outputs: [
      {
        internalType: 'uint256',
        name: 'contractID',
        type: 'uint256'
      },
      {
        internalType: 'address payable',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'capacity',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'usage',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'monthlyFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maintenanceCost',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'remainingPayments',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isForSale',
        type: 'bool'
      },
      {
        internalType: 'string',
        name: 'status',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'contractOwnerBTCWallet',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'lastMaintenancePayment',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_capacity',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_monthlyFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_maintenanceCost',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_remainingPayments',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_btcWalletAddress',
        type: 'string'
      }
    ],
    name: 'listContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maintenanceFeeUGX',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maintenanceFeeUSD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maintenanceInterval',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_contractID',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'transactionDetails',
        type: 'string'
      }
    ],
    name: 'markMaintenanceFeeAsPaid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_contractID',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'newStatus',
        type: 'string'
      }
    ],
    name: 'updateContractStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export const contractAddress = '0x5aef71e5ba0fec3df3992799fc63071454197a5b';

export default contractABI;
