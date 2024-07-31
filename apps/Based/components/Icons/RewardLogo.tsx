import React from "react";

export default function RewardLogo({
  size = 8,
  ...rest
}: {
  size?: number;
  [x: string]: any;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
    >
      <path
        d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z"
        fill="#FECBFF"
        stroke="#FB5FCF"
      />
      <rect
        x="7.85785"
        width="16.1824"
        height="16.1824"
        transform="rotate(23.7779 7.85785 0)"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1196_1316" transform="scale(0.00390625)" />
        </pattern>
        <image
          id="image0_1196_1316"
          width="256"
          height="256"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAA0w0lEQVR42u1dd1xUZ9a+yW4+U41dsVcE7C22aGxR6daoUYGhg4qg0mZgBqYyFKWXASwgghrd7Kab5ibZ3Wx6YhKTTTMm2aixJG7qbnbf75z3ziCRIm2Ye+H88fxAwXEY5jynP0dISUkRCARC1wS9CAQCEQCBQCACIBAIRAAEAoEIgEAgEAEQCAQiAAKBQARAIBCIAAgEAhEAgUAgAiAQCEQABAKBCIBAIBABEAgEIgACgUAEQCAQiAAIBAIRAIFAIAIgEAhEAAQCgQiAQCAQARAIBCIAAoFABEAgEIgACAQCEQCBQCACIEgGGg1+1IjQaK593iDg++k1IwIgdALDt0KfkiSYNCpBr0nmnzcGA35fikrQpST/5jHotSQCIMjS8JMFc0qisEtrEDbttAyb4v/surmah7Lmqo49Old1/A3EHNXx1+Dj47NUfyi8T/mQX1By7sR4jR6IQCkYgQwwKiASIAIgyMz40XjjNVrBR71/rovqxEPDlc9fHaN6mo1RPtMkhic+/78Jysdfnp98JDRUtfv3SAQYHWAaQURABECQeK6PRpoGXj9WbbzFVfmEZVji88xVeYKNUz0JeKoZeJK5KJ9mo5TPsmEJz53yVR1YnJykEwypSmstgUAEQHCoh+eFvOsBobpWrRLSknYIO5ONN7kpn3xqdOIzbJzySebWBJoiAjf4OCzhJJsW/3iIKskAtYEkigKIAAgdb+j4uVLQJccJ+qR4+JjAjb0udPD3KmOmsDPtgDBrx6Oq4YlPM9fEx5lLwuPMNUH8eA2PMZd4K+Bz/Lpr4hP1yUEpEsGwxJPMK/HgfHNKQm2ngEAEQLCjZ0cjR6PWqpWCFgw/VZ0jRKdX/T46vWx0dGbFggf3nl67bu+p2HXlp/LXl596eEPZWy+uOnj2bY+aq+8v33f2v+7ln7Dl5Z+y5WUfs6UlH7IlRafZooL32IK8d9i8PW+yOZmvsplpf2PTDC+yyakn2UTNs9zz1xKEjSTgz2MTnoC04MnXdqrToJOg4s+PIgEiAEK7GbyaG7suORGMXQnGrhJ2mktvjco6cM/6A29sXFf+Tva68i9e8qy++olnzeUfvGouM+/qbwAXa+EF8Kk6x1Yc/IqtrD7HVtXDeRE117AasPLQ18wX/o13xVnmse8ztqz0I7ao8D02P/stNtP8MpumewHI4RmIAp777zpVYd8M9S7+PG2RyLUUhIqERACEZhk9fsSwXZ8UJxo9fL7LVHRrgOX5eWv3/yMOPPpTXtWXPves+baOkYNxV30FBv5P+Nje+JoTQS1x1CEJ/Hvvii/YMogmfEvfP7nuwOnEsLxHvWLMpc4700t5hFJLCAAiBCIAwvVGb82bbUaPUOrShaisqjEPlr8V/MC+9//kVX35LKDWs/uiYYJnbn9jbzmQBJAYfKsv8EgDyIl51Hz7MzzXDx7Y+17Vg5bX/Len75u+M72MRzBadSL/GbXqJBooIgLoyob/2+KdUotGf9DlwbI3oldWfvGCx+HvfvTi3v0bSRl88/AVf8629MOj5gp8fukf68rfr1q/75WNUZkHRqq0aTwqQDLAtIaIgAiga+T1td5+J3jE3Vi8G7Su9I2QlZVnT4LR/4we1OfQeZkZfAsI4dBF5n74u+9XVJx56cHSV3ZEZVRMRjLQ15JBEpEBEUDnm74Tq/fim1ylNQqB+U/NXbP/XJVX9dUrvEjX6Yy+CcDPiT8v/tzuNd/9b2XFmTc3Wl6Nj8qsmKDUmvjrZFBBZKRSXXv9CEQA8qzkq8WcF6riMRl7e2wsf3vrisqzr3vUfMeLd752K97Jkgx+hcjghc2W10LC86r6RmVnCKaEnTxi0tDeARGAnDx+Khi+Vp0gpEIVPCa9fAD05VM9a66cw2Jel/L2rSADb0gTlhy7enHpsX/uDc15dHZSKowbqzB6SqA5AyIAqYf6osdHz7Wm+sQIr8Of5npXXbyMub38inmOAb5OKyvhdao8h/UC5lN55s8hOafW7Uyz3KJNvtZSJCIgApBMRT/VFuqDl4pOL3cCj5/hdejSD+jNyPDbHhV41Fxi7tWXPttQ/mbiDrOlp44TQVyXJwIyQofn+SnihJ6Gh/p3w2ReKrS9rpDHb/9OAn70hBTKs/rS+Q1lr0XtMJffZMCBKY21jaghAiB0YLiPhm9KjBFizVnCosc+3uhdhQM7ZPj2jgh8ORFcYssPffu2Iuth98RktWDAeou1UKghAiDYu7pvUO4UlMZ0IbjoxCSYl3/C69BlmJsnw+/oiACHjOZlnzriuyPHxZQcK6Rpk/l0ZVcRKSGj7OjqPh9ljRVi0yy3rzh4Nnv5kX/9z7ZoQ0bZwcVC62vuC/WBxeWf/zIvsdqoiFHfhYpH+lS1SAIaIgBCO3l9fVIMvKHMQnD+c/M9a66e9q7Cdt6XZIwOTgkQq2ouMA8ouE7Qvvj51JDs9bGJSUKmQSkY9KpOHQ2QgXZIay+J96BjTfu7rdl/ZrdHzb+sAzzk9aUUDeBi0pqjl9ms7HfZsPCSxxcG7nZJiN4jZAERpHTSaIAM1d6FPlhp1at2CmE5j033rPnpHa9qGuKRekqw9shFtmzfp6xvyMM/D1tbrFJAi9bcSaMBMla7FvpiBBWs5q7f/8FOj+pLv/qQ15cNEaw+/A1bcehL5hz/B9Zt8+4XloQUuGI0kGZQdqraABmsXYw/mW+n7UqzdF914NOjsN9OrT0ZkoCocnSBTdU8xbqtsvwyYuPeRBV0CMzapNpOAREA4TfGj7199PxhuY+Mh1z/fa9DF6jQJ+u6wDm2GlKCGfpnWM9N2czJv/ip1TsyhmTp6nQKiAAI/FoOqufqtUJg0dMrwOt/7wNyWOT1O0FdgBcHL7KZhj+zXhvzWA+/kgvLo7M8k8D4M02Jso4GyHjbyfh10NtXpZqElZWfxS0/cpWGejolCVxiM3TPsb4bc9idmy1sbHi+QRFcAsdSNOIUoYYIoGv291Vg/CBEsbLi81ycNSfD78QkAOnAVM0J1m9jNuurKGa3rzj01MqotN6Z+iRBK8MJQjLkNhk/7Own7xQSdeabVx04c5SMv4vUBKBDMFH5CCcBp+ACdre/5cNVOzLGpcuwLkDG3IZKf1r8DmFd1TO333/8wgmfg9+Q8XcVEqgWJc3HbK9m/TflMKfAEtbHv/QH5+gsbyUYf1pqsmzSATLoVhq/QbVDCM8/eScM9/yVZvm7YIsQ2oOecOxkaGg5G+CXxwYCCfTwK2VjQoq2J6lTBJNMSICMuqXGr04G0Y4dwvbdJ+/2qvnx7zTc03VJAOsBi/JPsQH++cwpoJANDipmPf1L2ejgwtQktUYWJECG3RJYz2xtzXnujuVHf3rV5yAZf1eXHlsLnYF79Cd5PWBQYHEtCYwJKSjASCDTlCAKkmqIAGQ/158WHy0oyg92u//4v1/yrSTjpyhAXCDCdGBszGFeDxgUdI0EnEPzj0Cb8CYDlx3TEAHI2fh5n1+bdtPq/Z+ewIUe3yoyfsK1vYFllg/ZQEURpAIFQAAlnAR6BVhYvwcO/lGZnHqzCcaHpRgFkJE3a8LP2uc/cKYSLuiS5yfUrwfUDgnZUgEgASgM9g0qYmNCC/6gUqfcJMWaABn5DYzfmBgrJKeYhBUVn2eS8ROaSgXw44jIA7wrUEsCmA4EYGGw4A9QGJQcCZChN+X5lQnC9myz4Hn0bIR31SUyfsINuwLzsl5l/TfnskGQDogEcC0dGBNSeFglsRYhGXsTvX5U7H1w70mP+499D0cmaKOPcCOIp85xQGgAkkBtFGCNBPyRBAqKkQSMWmmQABl8g+0+Db/FF5L36AjPQ1e+W1EpSknTG5xww4IgRAHz97wuRgGBdaMAWySALcJCrarOnICGCEBqeX+MsG1P5a1LH/rpPdrqI7Q0CsB9gdHbqq6rBdSJBCAdGBtcEJUIkYDOujtABCAhQQ+VziysOvDJQW8u5kHGT2hpLeASm23+izgXUI8ARBK426+MuUZnrciABSJHrhKT4f9mzDcJZvx3CRvK3w93BxkvMn5Ca7AS6gBe+z+HPYGyOnMBvwUSQx9/y48rd6RPyNSpHCYqQsZ/fd6f+9gEWOv91ZeMn9DGjsBE5aNNRgFOoCdwt3/pZyAx1sOYKl4kIgJwVN4POn5ReypuWXr0p9OU9xPaYzpwYd7brH+DdYBrJDAQvnb7pvIXQuJMAkYCHR0FkPHzvD9RSNIYBRjzzaO8n9AuaQAUAn0qzrLh4ftBSLSgEQIQ0TeghLmEFmQr1akdXhQkAuCSXnFCYP5z97vXXCUFX0L7pgGJj0AakNtEFGArCpayaVty1mRyyfGOI4Eu7/0Nyh1CdNq+25fX/OsrWvAhtHcacG/Gy9aZgOImowD8eu8Ay79W7swYJc4HaIgA7A0M/VV6PYh5flJEoT+hvbGq5jxbbvkHHwseqChqkgBsRcG7/Mveikg0/D69g7YHu3Tob1DGCUGFz96HMt4U+hPavw7wNfOu+IKN3FLJVYOaJgDcHizm9YCxoQV71DAp2BH1gC5c+NsFar4Hb/Y5+MNpHwr9CXY6PY5pgFvs8WalAbZIoDvUAzy2Zy3Kss4HEAG0u/dP5gSwbv+78Z7VFyn0J9i1EDgt5WlOADdOA2z1gBJcHPrKe3vWnWIqoCECaD/vj6F/rBBjfnKQR83lH6nwR7AnMAKYm/63RvYCGo8C+ilKgDAslfHJWrumAl2OAFKh8JesTRNWV3xT43WI5LwJdi4EHr7AFqNycIsIQCQB6Aowt5Aid3t2Bbpgz3+nEFxwYpb74SuMxn0JdicA0I9cXvYRL/ANVBS2gABK+JQgkMCXkYmG28x26gp0qcKfLilBSIIDnnC192/e6P3pDUrogIlArwNnoRNQAROB+S0iAEQ/iAKcQwvy8RKxHgeEiABaCbVaSFXHCYqiZ1d5VpP3J3QgoB2IsuEDNue1mAB4VwAkxt1jMmaZdEl8aY0IoBXe35SwS1CUVQkLHvnh9MoK6vkTOnYicFzcw6zf5pwW1gGsgILgnUGFrwYl493B9i0IdpFVX2j7qROFjeUf+nlXfUOa/oQOBbYCJyc/yXcCmtsKrFcQBD3B6eG5IZntvDbcNdR9YdknJrP89541F8/4HKQ3JKHjW4EzDX/mKUCrIgDrbEDvgNJLPgn6u83tKCjaBVR+kqH4pxTW7/tY4XWIhn4IjtgJuMDuzfz7DbQBmjEbAAXBgaGF+Xh4VAcFQSKAG4b+4kmvbTlVv/Os+e5jHzJ+gkMigAtsUd47rZgFqL8r0NO/7D8+MZnO6dr2mQ3oApX/eGHJox9s9K4i709w3FbgspIPuT7goFbVAK5hABQEhwUVP4SXh9sjCuj0U39402/VgS/e8amivj/BUSKh55l72cficE9AYZsIAKOAHlAQ9I7JnNUeUUDnXveFqb+g/BOLPEjhl+DgYSDPfZ+xYWHlEAW0kQBsUUBw0fPtEQV0cp2/NMG76uunyPsTHD0I5A3TgCMiK26oD9jcgmAPGA7yislc0NYooNNKfGPuv+LwC25w2oum/ggOvxbkC4Izo7cdgkJgfjsQAEYBxWxoUPELbY0COmnxD4Yl1CrB6/Cn+Vzqi96EBEdOA1rVgXAcGFuB7UEAtijAm0cBrdcM6JTeX5cUJ0Rn7LvTp+riFTrqSZCOMtCxFigDNa8WMCSobbWATlj8U3MCeKDizVDP6ktU/CNIZhx4fPwfWb9NOe1GALW1gOjM6a2tBXTK1l+iziT4Vn75ug+t/BIkRAD8VNjm1u4DNIz+EAVALeBYciujgE4n96VXxQvbsl6Y7F5zhbw/QVIEMCX5iTbtAzQeBVh+9YrOGpPRCuWgTif2mQoXfteXf5rjRcU/gsQIAMVB2zwO3EgtYGBYft4uIAB9C6OATkUAOtj625leeqtnzeVz1PojSGof4Mg3bIbuOSCA3HYnANwUvDug5EpAgqF7SzcFO9XkHxb/ggpOeMF5bwr/CZJbCJppfMEuEcCgIDwoYmEzwnMiDanqFukFdLLef5KwZv9H1dT7J0hvIegbNtv8Fz4I1N4EYIsCegVY3t2q1N9kTFV3PQLQg/ffabZ096q+9K0viX4QJCgKMsf8VygC2ocAsBjYC5aEfGPS55lb0BLsbOH/Ogr/CZI9EAKXgu0VAfCWIDzusMDiykQ8JtLMYmBnC/+PUfhPkCoBoCoQHgm1FwEM4oIhpVcD40y9TdrmaQd2jvAfq//mkrsg/L9Mmn8EqRLAvN2vsP52JYAS1kdhYbMic0LNzZwJ6DThf2D+CV9o/1H4T5AsAczf/ZpdIwDbZOCI4KKX+GRgM4qB8icAtTj8s2b/x/sp/CdImQDuy36DXweyJwFgMRDSgP8s2ZY9Mq0ZMwHyH/4B7x+TsfcWr5rLX9HwD0HKBLAg580OIABMA0rgqGhhooGfEtN0YgLgxz5B9Tfz4EwPmv0nSJ0AOiQCEI+KDvAvezM63iQYeTGwkxIArv5i/3992VvJXtUX6Y1GkHgK8HqHEMBgPhRU8uvSeOPYNG3TB0VlvvqrFBL0uwWQW/o76f4RJE8AezomAkDgaLDLlpw4PUYAmk5KAHrVLlD+2e/kfvjqTysO0sFPgtS7AK93GAHgQdFewYUvByenCqYm6gAyl/5KEIKh/Qf9fzr4SaA2YL2DoqU/B8WZhpmaqAPIXPorXli774Mcyv8JRAANdAMgDZgZmRsgDgV1MgLg+b8hS1hZ+Tlc/TlPbzKC9CcBs+w7CdjQUNCokILj8TAUpG0kDZB7/j/M/fB3P/tS/k+Qwy6AnZeBGj4mavkqPFF/W2NpgKzzf9j+W+FJ+T9BLuvA6fZcB264DoBpgE901szGNALknv9nUP5PkAUBgCDIrLSX7KIIdKM6wJSIvMTG6gCyzf/jTRnCioNnXqb8nyALRSA7SoLdSDB0VEjh03FJ2gbrADLN/2OFqMyKXpD/f0vz/wS5iILeoz9pF1HQGy4H+Vn+GZ5guNOYmtwJCMC6/rs9s2KeZ/UVenMRZCILblMF7tgIYBBPA0qY7w7z9IbqADIkADWc/laC9v+7Wyj/J9BdgObVASaG50aYGqgDyLYAuG7vuweIAAhyIgD7XAZqxl6AwsKmhuceMKTUlwyXHQForQtAKyvPnqIFIIKcCGBi4iPtfhuwuVqB/fxL3gyP1wuG69IAWQ4ARWVW9nevuXqVBoAIciKAcXEPw3Xg3A6PAETJ8NLLW5JS+19fCJRfARAEQKMyKueh/Dd1AAjywFf8MpDrrmM8AuhY47fVAUrY/esP1isEyrIAuM5yKlDM/4kACNIHHqpZWX2Ojd1xhBcBHUEAWAcYpyh90JgiYwLQcAJIFNbtey+bCoAEucE5usZhBICdgOmR2brrOwGyOwCCCsAP7Hv/pPehb+hNRZAJvma+lV+x0dsO8XVgR0UA0Ak4fH0nQH4KwJn7fg/6/2d9Kin8J8gEh75m3gc+ZyMiD4AiUIFDCIB3AgJLXglX/rYTILsRYFgBHuFR8+2PpABMkAsw//fc9ykbFraXOQU4hgBwNRiuB38UnGDoVrcTIL8R4KyK+R54AJTeWAS5LAJVn2fuZR+zwcEWNjCg0GEEAHWAi6EJBqe6hUDZdQA27H3TjwqABLkRwDLLP7jxd/QQUF0C6O1v+XWrUu9qlGUKwAuASmHt3veNVAAkyIoAas6zJUXvO2QP4PpZADgZNleWBCAeAYmHJaB3jlMEQJCXGtAFtjD3bYcTAHYCJoTlr5YlAWiTQAQkLVNYUfX5Wz4HaQeAIKcIwCoIKgECmB6RGyVLAuA3AHcf/D8QAfmSRoAJctMDdIQcWEMEMC0iTy1PAkjCFuCBYSAC8r0vvakIMlMDmq59lu8BSIAAdss2AtiRXsqvANtTBXglDG2sPHSO926xeosFnNU1FziLI3Cri+PoJba2Lh66LAI+X2PF2qPX/q4u+Netj2N7XMwTV8H/g/8n/t8c8FxwiKTuUgkZlDw3ASclPQ6bgDmO6wLYCCA8b6/8CABbgCADHpovyoC3yhCsaQM3cDRuNGyrQdsME40Qv44phk/FF8xr/+fQv/2E3V98mi3Ke5ufd56/+1U2F/TdZ0NIN9PwZy7zNEP3PJue+iyblvoMV32ZqjnBgZ/j34nf8xzXhENhSPy3+Bh4KQZvxi/OfweqxO9Bq+hD5rHvM+ZdcZb5VH5pfb7n+POsJQ8raYhkcY5/3UYSlBpJEAe/4r8vXAXuDwTg2C6Ahd0TmXPcrE2q3QeQVQtwzd4Ptt6wBWgzglpDv8BDMNF4vuEGjsblsfdTtrjgXV6cQUNGg52Q+CfmsuMozGxXseHh+9gQGNzAX9ggYG3s4eIUFx53xFyu/+Y8HtIhq+Mvtl8z0B92wfHf4L9H4GPhYw5UiP1hBGq4DQ0tYyMjK9iY7dXMdecxeF6P8OeH5HFv5t/ZQiCj5aUfwXjpWW70+HPaiAx/1mvk8DUZoKM3Aatsm4BHeRHQUcaPcIL38tDAkudjlAZBb40C5BMBAAGADJjJ+7oWoG8dz869utUQMJRGQ19e+g84y/w6uweMfKLyMTY25jAbHrGPGxoaNS5n1Bqy1ThxXtuJD23UMUxEYJFICA0ARReamsNuHNbHtv4/Axskm7rPTyQN/P6hIWVAVgf5nvnkpCc4Qdy35zW2tOQDPntuK0DZIgckBnwzUsTQsXsAvvA+HB11yGGbgNcEQlEhuPTloFiTYLReCpIRAaiAAN47gAQgvnG/5kZuy6XxxUavjsY+LfVp5hZ7nI2I2M8Nyslq5HUN6JpRFzs0LGvpQkdtRGIjCiArfGPZCAJ/1oFWcsAIAqMaTD8wdcEUA1MbTBvWHL3YICnQjkV715TOQSp5BpyO4xaB6r5/IA14DcaBaxeCZDQEFAdjwO8863PkivWNex4WLD5j88HjTVE/ycYAww4OLOEGgMaA4ou1hi4jI28PgrCRgy26wRRlgJUYcCHFdedD8Jo9xeam/40thfoGJwVMI2pTiPO16QNFCW1dBLLtAZTyiNLREQAQwJuh8QbBKCcCQBEQpSlHWHXo3Hvu+z5nc8x/Za6xx/hyBXr0a2/wwi5j7K0lBiRFnlbgawYf8TXjpABpBBYskVDdyz+prV7XRgmHzhEhtHIMGEkWvf/AwCIpRACnMAKQBQFgpVID4gVZulghSF3Ya0Tck99iYc4WzqOXI2NvIzHYSGGzmEbY7tePjqqCusLjPErA1MHXWs3GKKE2bSBCaNYY8ILcNx0+BFSHAE4DAdwiDwIA40cFk8iYLGGwouBon01k9B0VKfD0wVpXwCgBxSywG4HRF262oeFfixCupQxUQ6hPAEii0iAAnAUo+SgswXCbbSVY2kdA4UmagASG+z4U0jOgpMlKO8F+pCAWUgvqEQIOt2AbFYuvGBGIsxTfUHRw3Rgwzolg21gKKQAMA30CBHCH5AlAAwIgmTCwsHxH5qjeQUU/kdeXJiHYPBu2V6drn2NLCt/l+nerbdEBFMFWWIeruuIQ0LUpQBgDVkgiBfgYUoDbJZ0CYO5vANmiKJVOGBBY/Gp/BRmetAmhsLYVicQwAlpeE1WPsXnQesQWGKYIa221AySDLjLWjCPrOEZuuwcghRQANAH+AQRwq2QJAI1fB+EJjiuODSvQgY4Zhf5yKyrWiQ4GB1l423G26UU+lFWbKljJoFPXDaxTp+IQUL4kfj8QAXwYmmCULgGkQs6PBLBgW/a9vQNE1iLjknF0AEVb2ywCpg6ojT/TcBKmFT/kBlJ3B6Oz1Q1EMdDP2DAYK3eYGOj1uoAKywcQAfyfJAkAvX+mTiU8uCv9jts27f3sRiO2BPnVDmwzCDhqjZ4RpxRxdBkJYM11C1mdYQYAox7b5KbDfwe4ERhQcjosXoJtQDR+lCuOS04VhgQX7x+gIO/f2VMFPsRlnefAoxnTYRAJyQALh2LN4Lx4VEOmZIA1j0X5p/jPKYUiNj6H3gGWd0MSDDdJMALQ8MLf/G17VvXwLyXP39XIwDp3gGTgDB0FXGzCEVokgTVHxOUuuaUI2ALEtW8pzADUkQZ/Q3KjwOj903VJQkC8qU93v7KL1PLromQQZIsM8mqr5lhAxEEaT+gm2PQb5DFnILYAp6U8Y52dKJIEAYA0+MshnAAksg1oC/1jk1KEwYFFxwYoaOCHUKdmYNVdGBJSyiYk/IndB6IsuF7LhVEgxJbqjAFeBOZCIPEP8/aoJFIAsK1eIQUvBkOabbTeB5RM6D9v654NFPoTmuwmbBL1GnDOANWWlhZ/YE0RLnIBFKlFBUgCuJLtaB2AWkkwaKlPjch9Gu0tRQqKQOj9M6Df7xdn6neXf9m3gyn0JzSDDGxzBthJGLvjCJuT/lfmBQIoNrk0KXQRxBbgGa4sJYkWIEqCcVnwvD9h/q9xtCagLfSPh3BkcFDRI/0p9Ce0sF5QN0VAGbVJMH24pODUtS6CAwuHGJngFqVDz4E1qAqcW+lwUVBRkFAtpBuUEPpn+/XwtzDy/oQ2RQU8RRDXmZ2jD4Pw6l+4qKstKujoWgG2AO/Lfl06HYBaAsjJcygBiDv+aiFTrxTmr61x6u5f+v0g8vyEdit0FdVqG6As2uTkJ9j9cJePy8dBVNAhHQSrdoK4BZgrsQggT+dYAoCiH4b+Edv3CP027z0xgDw/wW5RQUHtghLOFszLfEXsIFgXk+xFBHwJCAhgfPwfJdMBqJMC7HQoAeCOvx5WfUf4Hg3uTaO+BLv3vsWoQNxHyOVFObzSg0NGqH9ol/TA+nhSUAKuRwCRecEOIwBb1d8/zjSgV1DRDzTwQ+j4DkK+1SsXsfEwV7AYi4bWaUOb7mFbtxMxzUCRlCGQgmARUEoEMCG8YJVDCKDurD/k/H+kgR+CozUMbCvLWDS8F5SNuMzZ0Ytt7h7ggNISODojlR2AupeBVuzImO+gCEDDtcjnbcl+oCdV/QkSIoP+1qIhypzhARkcO8aIYHVr6gTWAuBM44uSKgAievuXsC2J+ikdTgDirL9K2Byb1vPOzeXnyfMTpDpghESAoTveTVgGq7y1bcRmEoGvdQcA0wspFQAHizcBfgIxkNEdTgB6CP0TlHphaIBl3wAFGT9B+mPHtku+qISMbUTUKeCLSDcqGNpOgW09KAkVoLoEAKvAF0ISjP1tgqAdQgAo7pkF3n/Rtj338Vl/Cv0JMgESgK2NiLp+eMl5pfUcHRYMGyICrB+4w+FWW51BSpOTsAuAisC3GToqAkDjx8WDyETD78Dzv+9EAh8EmQ4X8TYiFAzHgKQZFgz55aR6g0Vi/o9iqFIQAf0tARSxHn5lbwTGmQST9TBoB0QAqOuvFsaEFKp6B1DhjyD/9MCmfjxySwWbbX6JeVecFQVLoJWI239cBhx2EnDmQEoEgKn3qKDiE7GgtK3riBQAvb8ZmGZ+nHF4L3/LL1T4I3QqIrAqGOFdRRwswr7/2ocu8xRglOTyf7EFeE9kzj5U29ZoUuxLALhqiJXGeFUq6PoXPTkgkHr+hM49boyHavG4KtYJpJb/24aApkbkGep2AOxGAKng/XUg8TV3227f3iTyQegC48Y2+XPb7UqpTbkiAUwOy4u0OwHw0B8Kfw8q9d1uV5R8MpgKf4QuJnAqxecGF4HYzMhcjw6IANS8yDAuNF/dl676EAjSmAGA6Vs4CDK17gxAuxMAev90KPzBss8Q6Pn/QlV/AqFuK05Ex6cofAjoXzADMMyuEYAeHjw2SStAKCSq+xIBEAgOJwDrQZAzwfHGO2xy4O1OAPyctzjxt+RuKvwRCNKZaIQ6HF7ZjoRxfIM9IgDbxN+2eONNToqSd2nij0BoXYRgrxkAUAI6ht6/7gxAO0YAasGAhb/A4u10zptAaHmOztODkL1sYNh+Nii4fXdmrARgsgsBoPdPg8KfX2xa754Bliuk8kMgtNzzDwyysFFL/NgIr23in8MqgAjKrETQNpviSkBheYHXFwDbhQBSrfP+bqH52XB6mH6hBEILvf/A0H1syHo9c3V1ZW6uLsx5xgI23CdaPCsedkAkgqDWEwHOAKy5TgmoXQiAD/3AxN/8ONMomPf/D1X9CYSWVuhLmBMY+eiF65irmytznTCFuY4bz8nAefo8NtxzCxBBQRsiAj4D8G9QAhp7/QxAmwmAt/2UKcKAgMJjTgr6ZRIILR3QGRRSzoZsymIuk6aC8U9mrpOmiZgIfx43AYjAhY2dNoeN8IhggwLqEEGzI4Ji1su/9KuQeOPd17cA20QAtqGfJVG755LGH4HQSvUhMOiRy4K4x3dBo7cRQF0iGG8jgrktJoKBuLmoKHkDIoB6LcBWEwBX+IW1QrzrBw/+ihPJfBEILScANGAw5rFT54CRT6xv/A0QAdYI8PtHuDePCDD/nx6Re8TUQAeg1QSAhT8tqPzO2ZKzntp+BELrvf9wqPrz3L8h798cIvAI/y0RXFcjwIvAk8Pzko3tRQCi0EeSsGlHxi23by7/lEJ/AqEV03lBpbzdhxV/XvRrLgE0SARz2XCPSCgWFl5HBGIEMHtrzsqGOgCtjADEbb8JQcVb+yrEKib9QgmElnr/A2z4iljw/m5gzFNaZvyN1gjuhYhia210MRAGivpAfS48wTDJpG0HArAN/WzeZb4Dtv2+pqu+BEJrBn8s3EuPmbUUvP+4lnv/xojA2jVwnj6fDfeO4kTQK7jiSki8oWddIdBWEwA/7Ml3/QsS+1Lbj0Bo5eDPfjZ0TRJzcRsn9v3bavz1iGA8pAaubMTkuayf+/aTkUqj0OYUwOb9Yde/Bwz9XKaRXwKhlWO/MPM/+l5va/g/tX0JADBm3GQ2zNmNuY0bV+a/cUMfg0HfYAGwRQRg8/7jQ/PUfWnXn0BoHQGE7mVOazS/Dh8zlo12ncBGuU1ko8dNahejHwmPN3SM6y/jp844snbd+unJ6mQhzWjgdznbRAC13j/WiN7/Enl/AqF1k399A8vYPYo9fuvXrJo2btK00JnzFlim3DPntWFj3P45fOy4XwDckEcjMdwA+H34/eDtz02Yes/z9y1eFq0IDnZRqpSCOS1N0Gm13HYRjdl2C7x/MuT+ecm4WUTen0Bo3dw/XOg9Fa5KE7JMOkGbmioY9HohOSlZCFAE3aEICnYNDg1buniZ+6YpM+/dOWPO/IwZc+aVAioAR+DP1QALfL576sw5CUuWuW8ICgmb468I7K5SKgWjwSCkmUyCthmG32wCuFb5T7sTRn7psi+B0Ervj0NzMyJzNpr4TL5GSAUCQBtDg0XDNZmM/KMeSAH/TtcE8Ot6vY5/v83obfbaksJ+s/r+RpD6GhdauJ17f5kQAJ9PCLS/2gqB0NzePyzlfByWYPxdY2O5dQ04NbUOUup8tMFKHi01+BYTALYPNkYUdINd/zOOy/2LWX8gn36NoG9AKbBr89EH0NDj0VATwV6tP/T+0yPygsWRXI1dDvK0OwEgS+GRj/FrD23oHVBiF+8/KNjCcCUSRRH6BZZyQ0QJo57+3Fj/Ax8vA844hxa+My4s/0m3sIJKt9CCXBAgScWoxDmsUDF9l3k9XD1dsTkubTlg8ebYtPv84tLu3SxiJmAW/Hk+/P2ioDjTsvvjTKuGR+QGuoUUxMJjpcFcw0F47Bf7BZZ8BANOF4Cp/4vHTDHiQQxQ0L4DoQ1jvwquyvtlRKLxFmMT3l9yBIBtv9ikVGFoWH7bN/5sumcwATUIjB1HIfncMsxED/aDG+xrtf92Ccw+7hxWlDJ3a46fIs54PxitGxhtv02x5pvV8KLhOqP+N9AIOoAeahTmOkhrAvh1I0B33WPhYwcnGoSNsWk94P+e6BuT6TU2tHDr+LD84pEhha+A0vE/e0Lk0DeQ31m3kgK9uQnNEOQI4Hf5otMk5v2bJABkqXRQ+7k/Omt2z1bLfBdzgcNag4cJqMEB+Wzoeh3fghq1cD1znr2MDXaZxBYuWLwQjdCgFQ3dXMdgEbh9yAsnDaCpPmdDh0tTNCkNPobJ+v8icHYaiQE/xqlThU1xptv9YjKmuKw4tnZ8RG7m8ODCl7sHlJ7HdAJTEKdgOAkFoDSCcH3uDwRwHo5y3GaSmPdvkgAMeqUQtSVP6LuqpnpgSEHLPD0Y/UBu9BXc6w/ZYIK1xUg2Zt4KvrDAd59hBtoNJqFGjXFm8xcsDNLroKoJaKlB2+e0eUot2eBHXYrGSkhACppUTky7QAvBP9bUY3GsacGYyOydQzdUnOi+Yf9XfRQl1rShhNIG8v5i7h+ZG2OSoPdvkgBweeDBXeb+Pf3Kvr9h39/6dZ7Lc6O3gMihjo1cqmDO9ywCg5/Exx7R4Lnx8+2nqWwEDDFMmDJDj20PvU4nyReoMVLA9CPdmk6YDEoheluu4Be1+/YlUXvucw4pjIO04YW7/cqu9MYIobbASITQBb3/P8H7d5Oi92+UAPCJopebFpmzHfeJGw1rbYYfupeH+IM372EjPCOZ86wloqGj0AHfdZ5Sb+ZZnFd2rfT394P+p0nSxt9kOmFNKQx6lZAOwK4JphKxyVohIM7k5LE909c5pMACqcJnUFyEIie8biGFjK4mdw3vPy0iZ5tUvX+jBIC5b1xyijAksPithot/xeJWU4ho+EM2prNRizeCsOEMvoXUmNFfM/5JbITruBdCIyJuzshIl6XxNxUliBGCmkcISKT4eXi86eaFccZ5I0MKUnuurn67p7XbMYAig85Z+cepP6j8hyfob5Gq92+QANCrYetv7qrDE2Hy73/13py2HB9C/cF+e9hIMHxUM+WGP2HSDbebuPG7jD8dGh5xZ7o5rdkji3ImBEwbeBcCiqo6iAz8QkoEvwTj1KkRubFDg4r/hrcU+1KrsRPm/nmRmEpL+f1df+4f3rRqIADn0HxdvwBLfSUTKO5hKw/1yl0mTeeSRL+RM24ELgDn8ZORAL4A4x/a2Y2/0e4D1A7MRljWgIIikgJeU94UmzZ5Unh+4l2by9/DN04/qhnI3vuDEs/ZiAT976Xs/RskALzyEwxvyruDik4NtoX/6PWtMkZDNmexMXPcufLIDZVMa0UKpnHd8yGjx15esHDR+MyMjC5l/I3WDmypAkYG8LkiNk1wB5n1sSEFWSDm+BlOLXIyIKOSn/cPzwmRcu7fKAHglV9Y/Bnbx7/010HWXN92q2zoWjUbO3lGy4UMJqLxu/44f4HHLJ02lc8xd1Xjb4gMNNa5BLMumXdfeM0g0fC7ZVGZi8eG5JeDNznfm9cLKE2QSe7/WUSi9L1/PQLAJ4tPekp4bmgfq9y3zfi5gCFqjmGBr0ViBVNRpOB/8xYsW6rT6gWdxNt9Uiki2iYXkZADY029pocUbh4aVPg0DGX9j1IEqef+sPGnTZbF+/y6vX94wvCkJ4TlP9RPcU27fNjKeNHwmxvy/8b43djchUtXoOGT8beUDFKsBURxQjFRlSrM35U2eXR4Xhq0Fc/0CqCBI2l5/2LI/UvfiUgwCnLw/vUIABcVQEH0Zghh3h9kEy98QMtcsLrfQuPHot+w0a4w5Xf/Khzy0ZPxtykq0FiHj0zWPYawREO35VFZvoODih6GBaYf+LBRUDGRgYM3/saFFHnwG3wyea/XIwDQEB8O10S/58cF/PPE0V2ULm6h8UPY/9/5C+9fqSfP3+7FQ1tUgHMGcTCSvDnONHJiWK62p3/JWdxNoNmCjkd/iMSGBRWdVKpT+N0MOXj/BghADfPtaTOx4ITef9TCDWK1f2LzDd9twlQ2fLTrz/cuXrKcwn77RgYIvXVPAU8/+yfob3OLztwwLLD4Wdhc/C9pHHSc94cojHnHZEzPgKtZvMOVIlMCmB6e69MnCEL/DUYx9G9Gj7+WAKDPP2CM28VZy93nGVC6iIy/Q7sIuLmYBp2EBGjjLo3OnDw2NL8AorlvkNCpaGg/9OPev/hQksbq/WX0/qlHANABUPQOPsBXdfFkcXONH6WNx7hN/OiBwCCXJNAh11uFCclIO3bQCIFtRLGDoBYUcYZ+E8JyoyE1+KAXjR7bxft39yv7aUV01rB0q/dPkTMBTIwo9O+7OZ/fIm9u4W+EC+ibu0x8Cib8emWlm7naKRm/VDoIIhFsTTTcBEXDFU6BxSd6+JUxJ1xIQg0DShHa1PbDdvn4sAIDFv20MvP+9QkAfoA52wuX91+jEw8ONjHs44JfmzwdlnomsEnTZmaFhUXchFrkXXnCT5J1AuvEIXYPsGiYAEVD953m6f0fOGjpvnHf1b7URmxT268Xl/oydDNz7y+/90j9NmBS5uh+vsqrfNrvBiF//yEjz8+dt4j3+I1Gg0DGL4OiIUQDGahfAGIvG6Ozhk6MyEuG4aIv+eAXpQctCv1hWY5Nicxdww9vyqjw1ygB6IEAtiZl3jTIO+4EP1zYkOG7TeJ3x6bMnFP6wPoN/ZOTkvhxAzJ+eREB1y+AHQReJ9hlunN8SHZY96Did3pDNZuGi5rZ9gsufkal1nDtTDl6/4ZHgQ0GYfHawOUDRzr/PMp1IhMxgQMM/8fJM2Yf2eTnPwW/P91srr1CQsYl4x0E1FwEBEF64BGV5TNIUfx0DyKCJnP/u/zKfvWOyXJJl1nb74YEwAt46iRh/cbNY++Zc1/K7PkLj8+ev6hsxuy5wRs2bhydAl83p7Xs/BBB+nWCVK4Doa6tEyzfljkdpgwrID34N6og00bitdAfVbJASl6jVsuv7XfDbUA0aCQBk9HITxTVBf4dGX7XqBOgZ1OCGvL8OJPrmLC8XNhI/LYPEYFY+PMvPR2ZaLhZroW/lBtrAmqaeJOQ4XeVqAB3D2wbiXArYTAsiel6+Vm+7hPQVVMDDP1LmVd0xky5h/4pLbkOTOjC8wTWZaQ6RNB7fHj+TlCL/pS3EFEyPrBrGD+mQniRKlmtkdW8PxEAoV1Sg5Q6g0VB8aZbpwQVB961uvqt3kAAnbtgWMycsO3nV/6XrXEmEG5J6hTGTwRAaDURmKGNqFXpheDIfMF9R7ovrI8/h50Dp044S8A1/gIsV9btMg+3yXxpUogACF2cCFJx5wCGimydA5AwmzNYUXQEiOC/Tp3mdiJs+sHo9LjorOXpOpXg6KtVRAAE6XYOYBMxEY7JLovMmNA/JH9f9wDL9/1kLXcuTvu5huZHJclsz58IgOAgItAIGRARREOovCnOCEIleem9YCW5b+2osZyMvxSKfgVmNYT8trPemhQiAALhhi1Eg3XCUOwcmPpPDM9L7BlgOdtXFjsHxQxvYowLzS/pzMZPBECwf52gTudAkWDsPjEyO7h7YNFbffylKl0GWpjBhezWdZXHg0OKhQxjQqc1fiIAQocSAV5DSgUyCMGVZHHn4JkekiKCYnguXN7r6dXxxt/xin9K5zV+IgBCxxGBFXh6Ls1aMOQ7B1szpg4NLD7AlY0DHKlhKPb6oeL//Npd5m5ZMOnX2Sr+RAAE6XUO8N4BHEz1R2Xj8DwVrCN/2jugo+cJwPihW9HDz/LcgzvM3TJ0XcP4iQAIkiACvHPAlY3ho5/ScOv47ZnrQNn4ZM8OuZosFvzuVBQeXxtj6pbZhYyfCIAguToBKhub+TyBVpgXa5riEpaXCQXDj1DZ2CmgPclAPHgLgp6g6ZefFaHB/zup9vl0ldee3oAESdUJUuqkB9g9wKvJkQmG/3PfnuXZLzT/aA/Q4MO15LbNFRTzq8tAKudnbsndgHLeGfyaT9cyfiIAgqSjgpTaqCCZDxdFwZARnES7e9n2LG+YzjvQW2E5DXcPuDIvGvQQfs26caPvrxC/t0dA6XfDggqyN8QY+2bpk2on/DRd8HWmNxtBNimCoc7VZOt9xJv849KmTovICwaFngMQzr/WR2H5Aoz8JzT0OvgF6glnxoYUPjthS/YW93jjEFzowbqDLd/XdNHXlt5gBPmRQcq1egG/hgSGjO1FRVyaEJpg6B6aYBwNmAy4BzAV4Azry3egwpGZE4iapxaaLhjyEwEQOiUp2CYObaRQHyB82oWq+0QABAKBCIBAIBABEAgEIgACgUAEQCAQiAAIBCIAehEIhC6L/wfQsyekWOaW8QAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
}
