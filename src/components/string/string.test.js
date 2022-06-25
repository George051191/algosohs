import { render, screen, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer'
import React from "react";
import { reverseStarting } from "./utils";

describe('Корректный разворот строки', () => {
    it('Разворот строки с четным кол. символов и отправка в стейт проходят успешно', async() => {
        const mockFn = jest.fn()
        await reverseStarting('goga', () => {}, () => {}, () => {}, () => {}, mockFn, () => {}, () => {})
        expect(mockFn).toHaveBeenCalledWith('agog')
    });

    it('Разворот строки с нечетным кол. символов и отправка в стейт проходят успешно', async() => {
        const mockFn = jest.fn()
        await reverseStarting('tru', () => {}, () => {}, () => {}, () => {}, mockFn, () => {}, () => {})
        expect(mockFn).toHaveBeenCalledWith('urt')
    });

    it('Разворот строки с одним символов и отправка в стейт проходят успешно', async() => {
        const mockFn = jest.fn()
        await reverseStarting('t', () => {}, () => {}, () => {}, () => {}, mockFn, () => {}, () => {})
        expect(mockFn).toHaveBeenCalledWith('t')
    });

    it('Разворот пустой строки и отправка в стейт проходят успешно', async() => {
        const mockFn = jest.fn()
        await reverseStarting(' ', () => {}, () => {}, () => {}, () => {}, mockFn, () => {}, () => {})
        expect(mockFn).toHaveBeenCalledWith(' ')
    });
})