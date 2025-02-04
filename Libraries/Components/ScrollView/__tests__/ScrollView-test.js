/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow-strict
 * @format
 * @oncall react_native
 */

'use strict';

const Text = require('../../../Text/Text');
const ReactNativeTestTools = require('../../../Utilities/ReactNativeTestTools');
const View = require('../../View/View');
const ScrollView = require('../ScrollView');
const React = require('react');
const ReactTestRenderer = require('react-test-renderer');

describe('ScrollView', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders its children', () => {
    ReactNativeTestTools.expectRendersMatchingSnapshot(
      'ScrollView',
      () => (
        <ScrollView>
          <View>
            <Text>Hello World!</Text>
          </View>
        </ScrollView>
      ),
      () => {
        jest.dontMock('../ScrollView');
      },
    );
  });

  it('mocks native methods and instance methods', () => {
    jest.mock('../ScrollView');

    const ref = React.createRef();
    ReactTestRenderer.create(<ScrollView ref={ref} />);

    expect(ref.current?.measure).toBeInstanceOf(jest.fn().constructor);
    expect(ref.current?.scrollTo).toBeInstanceOf(jest.fn().constructor);
  });

  describe('ref', () => {
    it('receives an instance or null', () => {
      jest.dontMock('../ScrollView');

      const scrollViewRef = jest.fn();
      const testRendererInstance = ReactTestRenderer.create(
        <ScrollView ref={scrollViewRef} />,
      );

      expect(scrollViewRef).toHaveBeenLastCalledWith(
        expect.objectContaining({_nativeTag: expect.any(Number)}),
      );

      testRendererInstance.unmount();

      expect(scrollViewRef).toHaveBeenLastCalledWith(null);
    });
  });

  describe('getInnerViewRef', () => {
    it('returns an instance', () => {
      jest.dontMock('../ScrollView');

      const scrollViewRef = React.createRef(null);
      ReactTestRenderer.create(<ScrollView ref={scrollViewRef} />);
      const innerViewRef = scrollViewRef.current.getInnerViewRef();

      // This is checking if the ref acts like a host component. If we had an
      // `isHostComponent(ref)` method, that would be preferred.
      expect(innerViewRef.measure).toBeInstanceOf(jest.fn().constructor);
      expect(innerViewRef.measureLayout).toBeInstanceOf(jest.fn().constructor);
      expect(innerViewRef.measureInWindow).toBeInstanceOf(
        jest.fn().constructor,
      );
    });
  });
});
