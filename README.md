Use Css grid and create following areas:
- Top score area tracks moves.
- Top area has restart game button.
- top has stars.  Too many moves, stars start disappearing.

Different screen when winning game, restart button on screen, shows # of moves.

- create a "table", give it box shadow.
- table has 4 x 4 grid system with gutters. use grid area names "0 to 15".
- each grid has a div (class) and single img element.
- img element has rounded corners, holds svg

Test:

create a grid 2 x 2. done.
create grid area names. done.
create an img. done.
move the img around with javascript? Yes, tested.

it works, grid area must be strings, not numbers.  Associate 0-15 array with alphabet a to (whatever is 15).

- In array is integer 1-8, switch statement 1-8 for different images.

Test:

switch statement flow 1-8 show different image? Yes, it works.

- create img element, give it image with find card, put that img element to appropriate grid area based on arrayIndex:alpahbet A-P

This will be a loop, i in loop is index of array (which is also grid area)

We can use the .createDocumentFragment() method to create an empty DocumentFragment object. This code should be very familiar to you, because it looks so very similar to document.createElement().

const myDocFrag = document.createDocumentFragment();
Let's rewrite our code to use a DocumentFragment instead of the <div>.

const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>

for (let i = 0; i < 200; i++) {
    const newElement = document.createElement('p');
    newElement.innerText = 'This is paragraph number ' + i;

    fragment.appendChild(newElement);
}

document.body.appendChild(fragment); // reflow and repaint here -- once!
