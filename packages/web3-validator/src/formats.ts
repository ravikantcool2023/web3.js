/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
import { Filter } from 'web3-types';
import { ValidInputTypes } from './types';
import {
	isAddress,
	isBlockNumber,
	isBlockNumberOrTag,
	isBlockTag,
	isBloom,
	isBoolean,
	isBytes,
	isFilterObject,
	isHexStrict,
	isInt,
	isNumber,
	isString,
	isUInt,
} from './validation';

const formats: { [key: string]: (data: unknown) => boolean } = {
	address: (data: unknown) => isAddress(data as ValidInputTypes),
	bloom: (data: unknown) => isBloom(data as ValidInputTypes),
	blockNumber: (data: unknown) => isBlockNumber(data as string | number | bigint),
	blockTag: (data: unknown) => isBlockTag(data as string),
	blockNumberOrTag: (data: unknown) => isBlockNumberOrTag(data as string | number | bigint),
	bool: (data: unknown) => isBoolean(data as ValidInputTypes),
	bytes: (data: unknown) => isBytes(data as ValidInputTypes | Uint8Array | number[]),
	filter: (data: unknown) => isFilterObject(data as Filter),
	hex: (data: unknown) => isHexStrict(data as ValidInputTypes),
	uint: (data: unknown) => isUInt(data as ValidInputTypes),
	int: (data: unknown) => isInt(data as ValidInputTypes),
	number: (data: unknown) => isNumber(data as ValidInputTypes),
	string: (data: unknown) => isString(data as ValidInputTypes),
};
// generate formats for all numbers types
for (let i = 3; i <= 8; i += 1) {
	const bitSize = 2 ** i;
	formats[`int${bitSize}`] = data => isInt(data as ValidInputTypes, { bitSize });
	formats[`uint${bitSize}`] = data => isUInt(data as ValidInputTypes, { bitSize });
}
// generate bytes
for (let size = 1; size <= 32; size += 1) {
	formats[`bytes${size}`] = data =>
		isBytes(data as ValidInputTypes | Uint8Array | number[], { size });
}

export default formats;
