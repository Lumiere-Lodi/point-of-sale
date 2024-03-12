import { registerPayload } from '../mock/request-payload/user';
import { registerResponse } from '../mock/response-payload/user';
import { getUserData } from '@server/controllers/user';
import { getProductData } from '@server/controllers/product';
import { productResponse } from '@tests/mock/response-payload/product';
import { productPayload } from '@tests/mock/request-payload/product';
import { upsellPayload } from '@tests/mock/request-payload/upsell';
import { getUpsellData } from '@server/controllers/upsell';
import { upsellResponse } from '@tests/mock/response-payload/upsell';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('$2a$10$0ntidlz0ve.azJILEfrfmeRj.JDBu.QVPZIR0WjqvO7Yw44Ivl66O'), // Mock the hash function to return a resolved promise with a dummy hashed password
}));

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('4e5508fd-979d-47ad-a56b-e9a604d02f1f'), // Mock the v4 function to return your custom unique ID
}));

const mockCurrentTime = new Date('2024-03-11T11:06:57.280Z').getTime();
jest.useFakeTimers(undefined).setSystemTime(mockCurrentTime);

describe('User', () => {
  it('register user in the system', async () => {
    const newUser = await getUserData(registerPayload);
    expect(registerResponse).toEqual(newUser);
  });
});

describe('Product', () => {
  it('add new product', async () => {
    const newProduct = getProductData(productPayload);
    expect(productResponse).toEqual(newProduct);
  });
});

describe('Upsell', () => {
  it('add new upsell', async () => {
    const newUpsell = getUpsellData(upsellPayload);
    expect(upsellResponse).toEqual(newUpsell);
  });
});

describe('Transaction', () => {
  it('add new transaction', async () => {
    const newUpsell = getUpsellData(upsellPayload);
    expect(upsellResponse).toEqual(newUpsell);
  });
});

describe('Test', () => {
  it('Test the test', async () => {
    expect(1).toEqual(1);
  });
});
