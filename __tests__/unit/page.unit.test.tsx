import Home from '@/app/page'
import {render, screen} from '@testing-library/react'

describe('Home Page', ()=>{
    it('Should render properly',()=>{
        render(<Home/>)
        const header = screen.getByRole('heading');
        console.log(header);
        expect(header).toHaveTextContent('Home Page');
    })

})